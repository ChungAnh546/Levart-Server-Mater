'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Destination extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here


        }
    };
    Destination.init({

        continent: DataTypes.STRING,
        country: DataTypes.STRING,
        region: DataTypes.STRING,
        address: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Destination',
    });
    return Destination;
};