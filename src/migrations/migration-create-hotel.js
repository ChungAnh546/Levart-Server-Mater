'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Hotels', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            hotelName: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            website: {
                type: Sequelize.STRING
            },
            starRating: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.TEXT
            },
            service: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Hotels');
    }
};