module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.STRING,
    sellerId: DataTypes.STRING,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,  
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING, 
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'users' },
      { foreignKey: 'sellerId', as: 'users' } 
    );

  };

  return Sale;
};
