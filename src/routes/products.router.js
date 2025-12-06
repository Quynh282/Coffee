const express = require('express');
const { z } = require('zod');

const productsController = require('../controllers/products.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const { validateRequest } = require('../middlewares/validator.middleware');
const { avatarUpload } = require('../middlewares/avatar-upload.middleware');
const { 
    productSchema, 
    partialProductSchema,
} = require('../schemas/product.schemas');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/products', router);

    router.get(
        '/', 
        validateRequest(z.object({ input: productSchema.pick({ id: true }).strict() })),
        productsController.getProduct
    ); 
    router.post(
        '/', 
        avatarUpload,
        validateRequest(z.object({ input: partialProductSchema })),
        productsController.createProduct
    );   
    router.delete(
        '/', 
        productsController.getProduct
    );

    router.get(
        '/:id', 
        validateRequest(z.object({ input: productSchema.pick({ id: true }).strict() })),
        productsController.getProduct
    );
    router.put(
        '/:id', 
        avatarUpload,
        validateRequest(z.object({ input: partialProductSchema })),
        productsController.createProduct
    );      
    router.delete(
        '/:id', 
        validateRequest(z.object({ input: productSchema.pick({ id: true }).strict() })),
        productsController.getProduct
    );
    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};
