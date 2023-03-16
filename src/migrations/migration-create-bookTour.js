'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BookTours', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //   tourId: DataTypes.INTEGER,
            //     customerId: DataTypes.INTEGER,
            //     numPersonA: DataTypes.INTEGER,
            //     numPersonB: DataTypes.INTEGER,
            //     date: DataTypes.DATE,
            //     payment: DataTypes.STRING,
            //     state: DataTypes.BOOLEAN,
            //     note: DataTypes.TEXT,
            tourId: {
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER
            },
            numPersonA: {
                type: Sequelize.INTEGER
            },
            numPersonB: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE
            },
            type: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.INTEGER
            },
            state: {
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
        await queryInterface.dropTable('BookTours');
    }
};