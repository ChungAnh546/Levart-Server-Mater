'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Hotel.belongsTo(models.TourHotel, { foreignKey: 'hotelId', targetKey: 'id', as: 'hotelData' });
        }
    };
    Hotel.init({

        hotelName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        website: DataTypes.STRING,
        starRating: DataTypes.STRING,
        note: DataTypes.TEXT,
        service: DataTypes.STRING,
        image: DataTypes.BLOB('long'),

    }, {
        sequelize,
        modelName: 'Hotel',

    });
    return Hotel;
};