'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Payments', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER
            },
            amount: {
                type: Sequelize.FLOAT
            },
            paymentMethod: {
                type: Sequelize.STRING
            },
            paymentDate: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Payments');
    }
};