'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('News', {

            // title: DataTypes.STRING,
            // description: DataTypes.TEXT,
            // contents: DataTypes.TEXT,
            // state: DataTypes.BOOLEAN,
            // postDate: DataTypes.DATE,
            // imgUML: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            contents: {
                type: Sequelize.TEXT
            },
            state: {
                type: Sequelize.BOOLEAN
            },
            postDate: {
                type: Sequelize.DATE
            },
            imgUML: {
                type: Sequelize.STRING
                //Sequelize.BLOB('long')
            },
            creatorId: {
                type: Sequelize.INTEGER
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('News');
    }
};