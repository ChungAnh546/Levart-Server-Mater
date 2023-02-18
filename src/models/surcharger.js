'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Surcharger extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Surcharger.init({

        tourId: DataTypes.INTEGER,
        surchargerName: DataTypes.STRING,
        personVi: DataTypes.FLOAT,
        foreigner: DataTypes.FLOAT,


    }, {
        sequelize,
        modelName: 'Surcharger',
    });
    return Surcharger;
};