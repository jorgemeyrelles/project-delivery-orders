// 'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
    [{
      id: 1,
      user_id: 3,
      seller_id: 2, 
      total_price: 29.3, 
      delivery_address: "Rua T 15 - Taquaralto - TO", 
      delivery_number: "712",  
      status: "em andamento"
    },
    {
      id: 2,
      user_id: 3,
      seller_id: 2, 
      total_price: 50.9, 
      delivery_address: "Avenida Feliz", 
      delivery_number: "02",  
      status: "concluido"
    },
    ], {
      tableName: 'sales',
      timestamps: false,
      underscored: true
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};