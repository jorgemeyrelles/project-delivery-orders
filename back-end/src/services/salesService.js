const { Sale, User, Product, SalesProduct } = require('../database/models');

const getSale = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Product, as: 'product', though: { attributes: [] } },
    ],
  });
  // console.log(sale);
  return sale;
};

const createSale = async (dataSale) => {
  const { userId, sellerId, totalPrice,
    deliveryAddress, deliveryNumber, status, products } = dataSale;

  const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
  });

  // console.log(products);

  const saleId = sale.id;
  const productsSale = products.map(async ({ productId, quantity }) => {
    const registerSale = await SalesProduct.create({ productId, saleId, quantity });
    return registerSale;
  });

  await Promise.all(productsSale);

  const createdSale = await getSale(saleId);
  // console.log(createdSale);

  return createdSale;
};

const listSales = async () => {
  const sales = await Sale.findAll({
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Product, as: 'product', though: { attributes: [] } },
    ],
  });
  return sales;
};

const updateStatus = async (id, status) => {
  const order = await Sale.findByPk(id);
  // if (!order) throw new Error('Order not found');
  if (order.status === 'Entregue') throw new Error('Order already delivered');
  await order.update({ status });
  return { status };
};

module.exports = {
  createSale,
  listSales,
  getSale,
  updateStatus,
};
