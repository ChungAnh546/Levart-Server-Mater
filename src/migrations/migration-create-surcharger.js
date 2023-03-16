'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Surchargers', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //   tourId: DataTypes.INTEGER,
            //   surchargerName: DataTypes.STRING,
            //   personVi: DataTypes.FLOAT,
            //   foreigner: DataTypes.FLOAT,
            tourId: {
                type: Sequelize.INTEGER
            },
            surchargerName: {
                type: Sequelize.STRING
            },
            personVi: {
                type: Sequelize.FLOAT
            },
            foreigner: {
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
        await queryInterface.dropTable('Surchargers');
    }
};