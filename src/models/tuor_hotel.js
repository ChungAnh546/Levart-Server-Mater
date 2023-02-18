'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TourHotel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    TourHotel.init({

        hotelId: DataTypes.INTEGER,
        tourId: DataTypes.INTEGER,



    }, {
        sequelize,
        modelName: 'TourHotel',
    });
    return TourHotel;
};