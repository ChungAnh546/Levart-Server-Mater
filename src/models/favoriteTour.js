'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FavoriteTour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // FavoriteTour.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
        }
    };
    FavoriteTour.init({

        tourId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER




    }, {
        sequelize,
        modelName: 'FavoriteTour',
    });
    return FavoriteTour;
};