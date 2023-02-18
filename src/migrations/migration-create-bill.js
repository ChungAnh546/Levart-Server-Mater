'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Bills', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //   bookTourId: DataTypes.INTEGER,
            //   customerId: DataTypes.INTEGER,
            //   creatorId: DataTypes.INTEGER,
            //   totalCost: DataTypes.FLOAT,
            bookTourId: {
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER
            },
            creatorId: {
                type: Sequelize.INTEGER
            },
            totalCost: {
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('Bills');
    }
};