const JSend = require('../jsend');

let products = [];
let nextId = 1;

function createProduct(req, res) {
    const body = req.body;

    const newProduct = {
        id: nextId++,
        name: body.name || "",
        price: body.price || 0,
        description: body.description || "",
        favorite: !!body.favorite,
        avatar: body.avatar || null,
        origin: body.origin || { farm: "", region: "", batch: "" },
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);

    return res.status(201).json(JSend.success({ product: newProduct }));
}

function getProductsByFilter(req, res) {
    let result = [...products];
    const { favorite, name } = req.query;

    if (favorite !== undefined) {
        const favBool = favorite === 'true';
        result = result.filter(p => p.favorite === favBool);
    }

    if (name) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    return res.json(JSend.success({ products: result }));
}

function getProduct(req, res) {
    const id = Number(req.params.id);
    const found = products.find(p => p.id === id);

    if (!found) return res.status(404).json(JSend.fail('Product not found'));

    return res.json(JSend.success({ product: found }));
}

function updateProduct(req, res) {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) return res.status(404).json(JSend.fail('Product not found'));

    const body = req.body;
    Object.assign(product, body);

    return res.json(JSend.success({ product }));
}

function deleteProduct(req, res) {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json(JSend.fail('Product not found'));

    products.splice(index, 1);

    return res.json(JSend.success({ message: "Product deleted" }));
}

function deleteAllProducts(req, res) {
    products = [];
    nextId = 1;
    return res.json(JSend.success({ message: 'All products deleted' }));
}

module.exports = {
    createProduct,
    getProductsByFilter,
    getProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
};
