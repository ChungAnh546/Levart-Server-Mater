'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ArrayImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ArrayImage.belongsTo(models.Tour, { foreignKey: 'tableId', targetKey: 'id', as: 'imageData' });
        }
    };
    ArrayImage.init({

        tableId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),




    }, {
        sequelize,
        modelName: 'ArrayImage',
    });
    return ArrayImage;
};