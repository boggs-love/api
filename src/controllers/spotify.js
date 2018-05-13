import Boom from 'boom';
import createSpotify from '../utils/spotify';

const search = async (request) => {
  if (!request.query.query) {
    throw Boom.badRequest('Query is Required');
  }

  const spotify = await createSpotify();

  const data = await spotify.searchTracks(request.query.query);

  return data.body.tracks.items;
};

export default search;
