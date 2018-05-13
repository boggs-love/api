import sequelize from './utils/sequelize';
import './entities/rsvp';
import './entities/guest';

sequelize.sync().then(() => {
  process.exit(0);
});
