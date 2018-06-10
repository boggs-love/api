import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Response from '../components/response';
import Thanks from '../components/thanks';
import createSpotify from '../utils/spotify';
import transport from '../utils/nodemailer-transport';

const site = process.env.SITE_EMAIL;
const bride = process.env.BRIDE_EMAIL;
const groom = process.env.GROOM_EMAIL;

const sendEmails = (rsvp) => {
  let title;
  switch (rsvp.type) {
    case 'wedding':
      title = 'Wedding';
      break;
    case 'rehearsal':
      title = 'Rehearsal Dinner';
      break;
    default:
      title = '';
      break;
  }

  let getTracks = Promise.resolve([]);
  if (rsvp.songs) {
    getTracks = createSpotify().then(spotify => (
      spotify.getTracks(rsvp.songs.map(s => s.id))
    )).then(data => data.body.tracks)
      .catch((e) => {
        console.error(e);
        return [];
      });
  }

  return Promise.all([
    getTracks.then(tracks => (
      transport.sendMail({
        from: site,
        to: [bride, groom],
        replyTo: {
          name: `${rsvp.firstName} ${rsvp.lastName}`,
          address: rsvp.email,
        },
        subject: `${title} RSVP (${rsvp.id})`,
        html: ReactDOMServer.renderToStaticNodeStream(React.createElement(Response, {
          rsvp,
          tracks,
        })),
      })
    )),
    transport.sendMail({
      from: site,
      to: {
        name: `${rsvp.firstName} ${rsvp.lastName}`,
        address: rsvp.email,
      },
      replyTo: bride,
      subject: rsvp.attending ?
        `${title} - Invitation Accepted` :
        `${title} - Invitation Declined`,
      html: ReactDOMServer.renderToStaticNodeStream(React.createElement(Thanks, {
        type: rsvp.type,
        attending: rsvp.attending,
      })),
    }),
  ]).catch((e) => {
    console.log('Send Mail Failed');
    console.error(e);
  });
};

export default sendEmails;
