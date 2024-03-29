'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('RentalServices', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //   rentalType: DataTypes.STRING,
            //   state: DataTypes.BOOLEAN,
            //   note: DataTypes.TEXT,
            //   address: DataTypes.STRING,
            //   phonenumber: DataTypes.STRING,
            //   contactInfo: DataTypes.STRING,
            rentalType: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.BOOLEAN
            },
            address: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING
            },
            contactInfo: {
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
        await queryInterface.dropTable('RentalServices');
    }
};