'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.AllCode, { foreignKey: 'gender', targetKey: 'key', as: 'genderData' })
      //   User.belongsTo(models.BookTour, { foreignKey: 'creatorId', targetKey: 'id', as: 'creatorBookTourData' });
      //   User.hasMany(models.Bill, { foreignKey: 'creatorId', as: 'billCreatorData' });
      //   User.hasMany(models.News, { foreignKey: 'creatorId', as: 'creatorNewsData' });
      // 
    }
  };
  User.init({

    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,
    image: DataTypes.STRING,
    verify: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};