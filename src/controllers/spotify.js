import Boom from 'boom';
import createSpotify from '../utils/spotify';

const search = (request) => {
  if (!request.query.query) {
    throw Boom.badRequest('Query is Required');
  }

  return createSpotify().then(spotify => (
    spotify.searchTracks(request.query.query)
  )).then(data => data.body.tracks.items);
};

export default search;
