'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Tour.belongsTo(models.Destination, { foreignKey: 'destinationId', targetKey: 'id', as: 'destinationData' });
            //Tour.hasMany(models.TourHotel, { foreignKey: 'tourId', as: 'tourHotelData' });
            //Tour.hasMany(models.Surcharger,{})
            /// Tour.hasMany(models.BookTour, { foreignKey: 'tourId', as: 'bookTourData' });
            // define association here
            Tour.hasMany(models.TourDetails, { foreignKey: 'tourId', as: 'tourDetailData' });
        }
    };
    Tour.init({

        nameTour: DataTypes.STRING,
        placeDest: DataTypes.STRING,
        placeGo: DataTypes.STRING,
        dateGo: DataTypes.DATE,
        dateBack: DataTypes.DATE,
        state: DataTypes.BOOLEAN,
        note: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        adultSlot: DataTypes.INTEGER,
        childrenSlot: DataTypes.INTEGER,
        adultPrice: DataTypes.FLOAT,
        childPrice: DataTypes.FLOAT,
        babySlot: DataTypes.INTEGER,
        babyPrice: DataTypes.FLOAT,
        destinationId: DataTypes.INTEGER,
        unit: DataTypes.STRING,
        dayDetail: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Tour',
    });
    return Tour;
};