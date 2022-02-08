'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('salesProducts',
    [{
      sale_id: 1,
      product_id: 2,
      quantity: 6,
    },
    {
      sale_id: 2,
      product_id: 3,
      quantity: 10,
    },
    ], {
      tableName: 'salesProducts',
      timestamps: false,
      underscored: true
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('salesProducts', null, {});
  }
};

