const express = require('express');
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
// const { validateJWT } = require('../auth/jwtFunctions');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/register', usersController.create);
router.get('/user', usersController.getUsers);
router.post('/customer/checkout', salesController.createSale);
// customers
router.get('/customer/orders', salesController.listSales);
router.get('/customer/orders/:id', salesController.getSaleById);
router.post('/customer/orders/:id', salesController.updateToStatus);
// sellers
router.get('/seller/orders', salesController.listSales);
router.get('/seller/orders/:id', salesController.getSaleById);
router.post('/seller/orders/:id', salesController.updateToStatus);
// admin
router.post('/admin/manage', usersController.create);
router.delete('/admin/users', usersController.removeOne);

router.get('/customer/products', productsController.list);
router.get('/user/:email', usersController.getByEmail);

module.exports = router;
