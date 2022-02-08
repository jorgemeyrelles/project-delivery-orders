const { Product } = require('../database/models');

const list = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = { list };
