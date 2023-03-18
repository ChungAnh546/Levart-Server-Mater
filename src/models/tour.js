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
            // define association here
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
        imgUML: DataTypes.STRING,
        numPersonA: DataTypes.INTEGER,
        numPersonB: DataTypes.INTEGER,
        pricePersonA: DataTypes.FLOAT,
        pricePersonB: DataTypes.FLOAT,
        destinationId: DataTypes.INTEGER,
        unit: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'Tour',
    });
    return Tour;
};