const express = require('express');
const { z } = require('zod');

const productsController = require('../controllers/products.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const { validateRequest } = require('../middlewares/validator.middleware');
const { 
    productSchema, 
    partialProductSchema,
} = require('../schemas/product.schemas');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/products', router);

    router.post(
        '/', 
        validateRequest(z.object({ input: partialProductSchema })),
        productsController.createProduct
    );
    router.get('/', productsController.getProductsByFilter);
    router.delete('/', productsController.deleteAllProducts);

    router.get(
        '/:id', 
        validateRequest(z.object({ input: productSchema.pick({ id: true }).strict() })),
        productsController.getProduct
    );
    router.put('/:id', productsController.updateProduct);
    router.delete('/:id', productsController.deleteProduct);

    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};
