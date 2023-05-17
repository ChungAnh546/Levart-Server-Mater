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
            //BookTour.belongsTo(models.Bill, { foreignKey: 'bookTourId', targetKey: 'id', as: 'billBookTourData' });
            // BookTour.belongsTo(models.Tour, { foreignKey: 'tourId', targetKey: 'id', as: 'bookTourData' });
            // BookTour.hasMany(models.User, { foreignKey: 'creatorId', as: 'creatorBookTourData' })
            // BookTour.hasOne(models.Payment, { foreignKey: 'paymentId', as: 'paymentBookTourData' });
        }
    };
    BookTour.init({

        tourId: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        adultSlot: DataTypes.INTEGER,
        childrenSlot: DataTypes.INTEGER,
        babySlot: DataTypes.INTEGER,
        date: DataTypes.STRING,
        type: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        state: DataTypes.STRING,
        note: DataTypes.TEXT,



    }, {
        sequelize,
        modelName: 'BookTour',
    });
    return BookTour;
};