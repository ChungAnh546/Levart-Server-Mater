'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //News.belongsTo(models.User, { foreignKey: 'creatorId', targetKey: 'id', as: 'creatorNewData' });
        }
    };
    News.init({

        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        contents: DataTypes.TEXT,
        state: DataTypes.BOOLEAN,
        postDate: DataTypes.STRING,
        imgUML: DataTypes.BLOB('long'),
        creatorId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};