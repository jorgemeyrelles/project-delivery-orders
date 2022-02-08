const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const list = rescue(async (req, res) => {
  const products = await productsService.list();
  res.status(200).json(products); 
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const prod = await productsService.byId(id);
  res.status(200).json(prod);
});

module.exports = { list, findById };
