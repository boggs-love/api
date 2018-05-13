import Spotify from 'spotify-web-api-node';

const createSpotify = async () => {
  const spotify = new Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  });


  const data = await spotify.refreshAccessToken();

  spotify.setAccessToken(data.body.access_token);

  return spotify;
};

export default createSpotify;
