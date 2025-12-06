const JSend = require('../jsend');
const ApiError = require('../api-error');
const productsService = require('../services/products.service');
const Paginator = require('../services/paginator');

async function createProduct(req, res, next) {
    try {
        const payload = {
            ...req.body,
            avatar: req.file ? `/public/uploads/${req.file.filename}` : null
        };

        const product = await productsService.createProduct(payload);
        res.status(201).json(JSend.success({ product }));
    } catch (err) {
        next(err);
    }
}

async function getProducts(req, res, next) {
    try {
        const paginator = new Paginator(req.query.page, req.query.limit);
        const result = await productsService.getProducts(req.query, paginator);
        res.json(JSend.success(result));
    } catch (err) {
        next(err);
    }
}

async function getProduct(req, res, next) {
    try {
        const product = await productsService.getProductById(req.params.id);
        if (!product) throw new ApiError(404, "Product not found");
        res.json(JSend.success({ product }));
    } catch (err) {
        next(err);
    }
}

async function updateProduct(req, res, next) {
    try {
        const payload = {
            ...req.body,
            avatar: req.file ? `/public/uploads/${req.file.filename}` : undefined
        };

        const exists = await productsService.getProductById(req.params.id);
        if (!exists) throw new ApiError(404, "Product not found");

        const product = await productsService.updateProduct(req.params.id, payload);
        res.json(JSend.success({ product }));
    } catch (err) {
        next(err);
    }
}

async function deleteProduct(req, res, next) {
    try {
        const exists = await productsService.getProductById(req.params.id);
        if (!exists) throw new ApiError(404, "Product not found");

        await productsService.deleteProduct(req.params.id);
        res.json(JSend.success({ message: "Product deleted" }));
    } catch (err) {
        next(err);
    }
}

async function deleteAllProducts(req, res, next) {
    try {
        await productsService.deleteAll();
        res.json(JSend.success({ message: "All products deleted" }));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts
};
