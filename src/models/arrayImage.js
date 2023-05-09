'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
        }
    };
    AllCode.init({

        tableId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long'),




    }, {
        sequelize,
        modelName: 'AllCode',
    });
    return AllCode;
};