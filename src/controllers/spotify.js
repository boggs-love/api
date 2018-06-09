import Boom from 'boom';
import createSpotify from '../utils/spotify';

const search = (request) => {
  if (!request.query.query) {
    throw Boom.badRequest('Query is Required');
  }

  return createSpotify().then(spotify => (
    spotify.searchTracks(request.query.query)
  )).then(data => (
    data.body.tracks.items.map(item => (
      {
        id: item.id,
        name: item.name,
        artists: item.artists.map(artist => artist.name),
        album: item.album.name,
        image: item.album.images[item.album.images.length - 1].url,
      }
    ))
  ));
};

export default search;
