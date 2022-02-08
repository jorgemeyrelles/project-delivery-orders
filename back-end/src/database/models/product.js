module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      url_image: DataTypes.STRING
    }, { timestamps: false, tableName: 'products'}
  );

  return Product;
};
