'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TourDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // TourDetails.belongsTo(models.Tour, { foreignKey: 'tourId', targetKey: 'id', as: 'tourDetailData' });
        }
    };
    TourDetails.init({

        title: DataTypes.STRING,
        schedule: DataTypes.TEXT,
        day: DataTypes.INTEGER,
        tourId: DataTypes.INTEGER,



    }, {
        sequelize,
        modelName: 'TourDetails',
    });
    return TourDetails;
};