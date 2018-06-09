import Sequelize from 'sequelize';
import { monotonicFactory } from 'ulid';
import sequelize from '../utils/sequelize';
import RSVPType from './rsvp-type';
import Guest from './guest';
import Song from './song';

const ulid = monotonicFactory();

const RSVP = sequelize.define('rsvp', {
  id: {
    type: Sequelize.CHAR(26),
    field: 'rsvp_id',
    defaultValue: () => ulid().toLowerCase(),
    primaryKey: true,
    allowNull: false,
    validate: {
      isLowercase: true,
    },
    roles: {
      self: {
        get: true,
        set: false,
      },
    },
  },
  attending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  note: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  underscored: true,
  timestamps: true,
  createdAt: 'created',
  updatedAt: false,
  freezeTableName: true,
});

RSVP.hasMany(Guest, {
  foreignKey: {
    roles: {
      self: {
        get: true,
        set: false,
      },
    },
  },
});

RSVP.belongsTo(RSVPType, {
  foreignKey: {
    name: 'type',
    field: 'type',
    allowNull: false,
  },
});

RSVP.belongsToMany(Song, {
  through: 'rsvp_song',
  timestamps: false,
});

export default RSVP;
