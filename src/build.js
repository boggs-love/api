import sequelize from './utils/sequelize';
import RSVPType from './entities/rsvp-type';
import './entities/rsvp';
import './entities/guest';
import './entities/song';

sequelize.sync().then(() => (
  RSVPType.count()
)).then(async (count) => {
  if (count !== 0) {
    return false;
  }

  return RSVPType.bulkCreate([
    {
      type: 'wedding',
    },
    {
      type: 'rehearsal',
    },
  ]);
}).then(() => {
  process.exit(0);
});
