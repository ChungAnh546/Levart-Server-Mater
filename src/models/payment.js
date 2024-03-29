'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
           // Payment.belongsTo(models.BookTour, { foreignKey: 'paymentId', as: 'paymentBookTourData' });
        }
    };
    Payment.init({

        customerId: DataTypes.INTEGER,
        amount: DataTypes.FLOAT,
        paymentMethod: DataTypes.STRING,
        paymentDate: DataTypes.STRING,
        status: DataTypes.STRING,
        note: DataTypes.TEXT,



    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};