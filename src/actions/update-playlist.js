import React from 'react';
import createSpotify from '../utils/spotify';

const userId = process.env.SPOTIFY_PLAYLIST_USER_ID;
const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

const updatePlaylist = async (rsvp) => {
  if (!userId || !playlistId) {
    return undefined;
  }

  if (!rsvp.songs) {
    return undefined;
  }

  return createSpotify().then(spotify => (
    spotify.getPlaylistTracks(userId, playlistId).then((data) => {
      const ids = rsvp.songs.map(song => song.id).filter(id => (
        !data.body.items.find(item => item.track.id === id)
      ));

      if (!ids) {
        return undefined;
      }

      return spotify.addTracksToPlaylist(userId, playlistId, ids.map(id => `spotify:track:${id}`));
    })
  )).catch((e) => {
    console.error('Spotify Update Failed');
    console.error(e);
  })
};

export default updatePlaylist;
