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
                type: Sequelize.STRING
            },
            dateBack: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.BOOLEAN
            },
            note: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.BLOB('long')
                //Sequelize.BLOB('long')
            },
            adultSlot: {
                type: Sequelize.INTEGER
            },
            childrenSlot: {
                type: Sequelize.INTEGER
            },
            adultPrice: {
                type: Sequelize.FLOAT
            },
            childPrice: {
                type: Sequelize.FLOAT
            },
            babySlot: {
                type: Sequelize.INTEGER
            },
            babyPrice: {
                type: Sequelize.FLOAT
            },
            destinationId: {
                type: Sequelize.INTEGER
            },
            unit: {
                type: Sequelize.STRING
            },
            dayDetail: {
                type: Sequelize.JSON
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