import Sequelize from 'sequelize';
import { monotonicFactory } from 'ulid';
import sequelize from '../utils/sequelize';

const ulid = monotonicFactory();

const Guest = sequelize.define('guest', {
  id: {
    type: Sequelize.CHAR(26),
    field: 'guest_id',
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
}, {
  underscored: true,
  timestamps: false,
  freezeTableName: true,
});

export default Guest;
