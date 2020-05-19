const express = require('express');
const router = express.Router();
const productController = require('../contollers/product');

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProducts);

module.exports = router;