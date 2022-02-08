'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
      },
      sellerId: {
        type: Sequelize.INTEGER,
        field: 'seller_id',
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        foreignKey: true,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9,2),
        field: 'total_price'
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address'
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number'
      },
      saleDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        field: 'sale_date'
      },
      status: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};
