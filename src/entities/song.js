import Sequelize from 'sequelize';
import sequelize from '../utils/sequelize';

const Song = sequelize.define('song', {
  id: {
    type: Sequelize.CHAR(22),
    field: 'song_id',
    primaryKey: true,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
  freezeTableName: true,
});

export default Song;
