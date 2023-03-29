'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const sql = `
      CREATE EVENT delete_old_otp
      ON SCHEDULE EVERY 2 MINUTE
      DO
        DELETE FROM Otps WHERE createdAt < DATE_SUB(NOW(), INTERVAL 2 MINUTE);
    `;
        await queryInterface.sequelize.query(sql);
    },

    down: async (queryInterface, Sequelize) => {
        const sql = `DROP EVENT IF EXISTS delete_old_otp;`;
        await queryInterface.sequelize.query(sql);
    }
};