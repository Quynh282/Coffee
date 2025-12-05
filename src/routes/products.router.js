const express = require('express');
const productsController = require('../controllers/products.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/products', router);

    router.post('/', productsController.createProduct);
    router.get('/', productsController.getProductsByFilter);
    router.delete('/', productsController.deleteAllProducts);

    router.get('/:id', productsController.getProduct);
    router.put('/:id', productsController.updateProduct);
    router.delete('/:id', productsController.deleteProduct);

    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};
