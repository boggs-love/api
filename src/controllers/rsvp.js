import sendEmails from '../actions/send-emails';
import updatePlaylist from '../actions/update-playlist';
import RSVP from '../entities/rsvp';
import Guest from '../entities/guest';
import Song from '../entities/song';

const create = async ({ payload }, h) => {
  // @see https://github.com/mickhansen/ssacl-attribute-roles/issues/13
  // @see https://github.com/sequelize/sequelize/issues/9402
  let rsvp = await RSVP.build(payload, {
    role: 'self',
    include: [Guest],
  }).save();

  let songs = payload.songs || [];
  songs = await Promise.all(songs.map(async (song) => {
    await Song.upsert(song);
    return Song.build(song, {
      isNewRecord: false,
    });
  }));

  await rsvp.addSongs(songs);

  rsvp = await rsvp.reload({
    include: [Guest, Song],
  });

  const response = h.response(rsvp);

  response.events.once('finish', () => (
    Promise.all([sendEmails(rsvp), updatePlaylist(rsvp)])
  ));

  return response;
};

export default create;
