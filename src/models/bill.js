'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Bill.init({

        bookTourId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        creatorId: DataTypes.INTEGER,
        totalCost: DataTypes.FLOAT,



    }, {
        sequelize,
        modelName: 'Bill',
    });
    return Bill;
};