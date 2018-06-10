import React from 'react';
import PropTypes from 'prop-types';

const Response = ({ rsvp, tracks }) => {
  const attending = (
    <React.Fragment>
      Attending: {rsvp.attending ? 'Yes' : 'No'}<br />
      <br />
    </React.Fragment>
  );

  const firstName = rsvp.firstName ? (
    <React.Fragment>
      First Name: {rsvp.firstName}<br />
      <br />
    </React.Fragment>
  ) : null;

  const lastName = rsvp.lastName ? (
    <React.Fragment>
      Last Name: {rsvp.lastName}<br />
      <br />
    </React.Fragment>
  ) : null;

  const email = rsvp.email ? (
    <React.Fragment>
      Email: {rsvp.email}<br />
      <br />
    </React.Fragment>
  ) : null;

  const phone = rsvp.phone ? (
    <React.Fragment>
      Phone: {rsvp.phone}<br />
      <br />
    </React.Fragment>
  ) : null;

  const guest = rsvp.guests ? (
    <React.Fragment>
      Guests:
      <ul>
        {rsvp.guests.map((g, i) => (
          <li key={i}>
            {g.firstName} {g.lastName}
          </li>
        ))}
      </ul>
      <br />
    </React.Fragment>
  ) : null;

  const song = tracks ? (
    <React.Fragment>
      Songs:
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            <a href={`https://open.spotify.com/track/${track.id}`}>{track.name}</a><br />
          </li>
        ))}
      </ul>
      <br />
    </React.Fragment>
  ) : null;

  const note = rsvp.note ? (
    <React.Fragment>
      Note:<br />
      {rsvp.note}<br />
      <br />
    </React.Fragment>
  ) : null;

  return (
    <React.Fragment>
      {attending}
      {firstName}
      {lastName}
      {email}
      {phone}
      {guest}
      {song}
      {note}
    </React.Fragment>
  );
};

Response.propTypes = {
  rsvp: PropTypes.shape({
    attending: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    guests: PropTypes.array,
    note: PropTypes.string,
  }).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.object),
};

Response.defaultProps = {
  tracks: [],
};

export default Response;
