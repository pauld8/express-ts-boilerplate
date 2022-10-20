import { Sequelize } from 'sequelize';

import User from './User';

export default (_sequalize: Sequelize) => {
  User.boot(_sequalize);
};
