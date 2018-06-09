import Sequelize from 'sequelize';
import sequelize from '../utils/sequelize';

const RSVPType = sequelize.define('rsvp_type', {
  type: {
    type: Sequelize.STRING(10),
    primaryKey: true,
    allowNull: false,
    validate: {
      isLowercase: true,
    },
  },
}, {
  underscored: true,
  timestamps: false,
  freezeTableName: true,
  tableName: 'rsvp_type',
});

export default RSVPType;
