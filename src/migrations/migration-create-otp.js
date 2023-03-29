'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Otps', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            otp: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            expire_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
            , updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Otps');
    }
};