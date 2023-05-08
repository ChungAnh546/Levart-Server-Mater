'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Tours', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            //   nameTour: DataTypes.STRING,
            //     placeDest: DataTypes.STRING,
            //     placeGo: DataTypes.STRING,
            //     dateGo: DataTypes.DATE,
            //     dateBack: DataTypes.DATE,
            //     state: DataTypes.BOOLEAN,
            //     note: DataTypes.STRING,
            //     imgUML: DataTypes.STRING,
            //     numPersonA: DataTypes.INTEGER,
            //     numPersonB: DataTypes.INTEGER,
            //     pricePersonA: DataTypes.FLOAT,
            //     pricePersonB: DataTypes.FLOAT,
            //     type: DataTypes.STRING,
            //     unit: DataTypes.STRING,
            nameTour: {
                type: Sequelize.STRING
            },
            placeDest: {
                type: Sequelize.STRING
            },
            placeGo: {
                type: Sequelize.STRING
            },
            dateGo: {
                type: Sequelize.DATE
            },
            dateBack: {
                type: Sequelize.DATE
            },
            state: {
                type: Sequelize.BOOLEAN
            },
            note: {
                type: Sequelize.TEXT
            },
            imgUML: {
                type: Sequelize.STRING
                //Sequelize.BLOB('long')
            },
            numPersonA: {
                type: Sequelize.INTEGER
            },
            numPersonB: {
                type: Sequelize.INTEGER
            },
            pricePersonA: {
                type: Sequelize.FLOAT
            },
            pricePersonB: {
                type: Sequelize.FLOAT
            },
            destinationId: {
                type: Sequelize.INTEGER
            },
            unit: {
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
        await queryInterface.dropTable('Tours');
    }
};