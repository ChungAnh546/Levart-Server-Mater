'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const sql = `
      CREATE EVENT update_status_bookTour
      ON SCHEDULE EVERY 1 MINUTE
      DO
        UPDATE booktours SET state = 'S4' WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 MINUTE) AND state = 'S2' ;
    `;
        await queryInterface.sequelize.query(sql);
    },

    down: async (queryInterface, Sequelize) => {
        const sql = `DROP EVENT IF EXISTS update_status_bookTour;`;
        await queryInterface.sequelize.query(sql);
    }
};