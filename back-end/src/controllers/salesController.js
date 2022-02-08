const salesServices = require('../services/salesService');

const createSale = async (req, res) => {
  const dataSale = req.body;
  const sale = await salesServices.createSale(dataSale);
  // console.log(sale.dataValues.id);
  res.status(201).json(sale.id);
};

const listSales = async (_req, res) => {
  const sales = await salesServices.listSales();

  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getSale(id);

  res.status(200).json(sale);
};

const updateToStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await salesServices.updateStatus(id, status);

  return res.status(200).json(order);
};

module.exports = {
  createSale,
  listSales,
  getSaleById,
  updateToStatus,
};