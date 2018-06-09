import React from 'react';
import PropTypes from 'prop-types';

const Thanks = ({ type, attending }) => {
  if (type === 'rehearsal' && attending) {
    return (
      <React.Fragment>
        Thank you for responding to our rehearsal dinner invitation.<br />
        <br />
        We look forward to seeing you on October 19th!<br />
        <br />
        Thank you,<br />
        Jeremy & Amanda<br />
      </React.Fragment>
    );
  }

  const url = 'https://secure3.hilton.com/en_US/hp/reservation/book.htm?ctyhocn=MCOUCHX&corporateCode=0002706981&from=lnrlink';
  if (attending) {
    return (
      <React.Fragment>
        Thank you for responding to our wedding invitation.<br /><br />
        If you are staying at the <a href={url}>Hampton Inn & Suites</a>,
        please remember to reserve your room by using the following url:<br />
        <a href={url}>{url}</a><br />
        <br />
        We look forward to seeing you on October 20th!<br />
        <br />
        Thank you,<br />
        Jeremy & Amanda<br />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      We are sad that you cannot make it. Thank you for your reply.
    </React.Fragment>
  );
};

Thanks.propTypes = {
  type: PropTypes.string.isRequired,
  attending: PropTypes.bool.isRequired,
};

export default Thanks;
