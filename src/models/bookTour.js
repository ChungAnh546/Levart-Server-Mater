'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BookTour extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    BookTour.init({

        tourId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        numPersonA: DataTypes.INTEGER,
        numPersonB: DataTypes.INTEGER,
        date: DataTypes.DATE,
        payment: DataTypes.STRING,
        state: DataTypes.BOOLEAN,
        note: DataTypes.TEXT,
        


    }, {
        sequelize,
        modelName: 'BookTour',
    });
    return BookTour;
};