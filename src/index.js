import Hapi from 'hapi';
import Boom from 'boom';
import Raven from 'raven';
import spotifySearch from './controllers/spotify';
import rsvpCreate from './controllers/rsvp';

Raven.config().install();

const server = Hapi.server({
  port: 80,
  host: '0.0.0.0',
});

server.route({
  method: 'GET',
  path: '/spotify/tracks',
  handler: spotifySearch,
});

server.route({
  method: 'POST',
  path: '/rsvp',
  handler: rsvpCreate,
});

server.ext('onPreResponse', (request, h) => {
  const { response } = request;
  if (response.isBoom) {
    if (response.name && response.name === 'SequelizeValidationError') {
      const error = Boom.badRequest(response.message);
      error.output.payload.errors = response.errors;
      return error;
    }

    Raven.captureException(response);
  }

  return h.continue;
});


const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', () => {
  process.exit(1);
});

init();
