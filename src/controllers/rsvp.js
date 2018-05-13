import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RSVP from '../entities/rsvp';
import Guest from '../entities/guest';
import Response from '../components/response';
import Thanks from '../components/thanks';
import transport from '../utils/nodemailer-transport';

const site = process.env.SITE_EMAIL;
const bride = process.env.BRIDE_EMAIL;
const groom = process.env.GROOM_EMAIL;

const sendEmails = rsvp => (
  Promise.all([
    transport.sendMail({
      from: site,
      to: [bride, groom],
      replyTo: {
        name: `${rsvp.firstName} ${rsvp.lastName}`,
        address: rsvp.email,
      },
      subject: `Wedding RSVP (${rsvp.id})`,
      html: ReactDOMServer.renderToStaticNodeStream(<Response rsvp={rsvp} />),
    }),
    transport.sendMail({
      from: site,
      to: {
        name: `${rsvp.firstName} ${rsvp.lastName}`,
        address: rsvp.email,
      },
      replyTo: bride,
      subject: rsvp.attending ? 'Invitation Accepted' : 'Invitation Declined',
      html: ReactDOMServer.renderToStaticNodeStream(<Thanks attending={rsvp.attending} />),
    }),
  ])
);

const create = async (request, h) => {
  // @see https://github.com/mickhansen/ssacl-attribute-roles/issues/13
  // @see https://github.com/sequelize/sequelize/issues/9402
  const rsvp = await RSVP.build(request.payload, {
    role: 'self',
    include: [Guest],
  }).save().then(r => r.get({ role: 'self' }));

  const response = h.response(rsvp);

  response.events.once('finish', () => sendEmails(rsvp));

  return response;
};

export default create;
