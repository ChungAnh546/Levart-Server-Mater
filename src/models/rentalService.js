'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RentalService extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    RentalService.init({

        rentalType: DataTypes.STRING,
        state: DataTypes.BOOLEAN,
        note: DataTypes.TEXT,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        contactInfo: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'RentalService',
    });
    return RentalService;
};