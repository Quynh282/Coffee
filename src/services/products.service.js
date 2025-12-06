const knex = require('../database/knex');

function repo() {
    return knex('products');
}

function readData(payload) {
    return {
        ...(payload.name && { name: payload.name }),
        ...(payload.price !== undefined && { price: payload.price }),
        ...(payload.description && { description: payload.description }),
        ...(payload.favorite !== undefined && { favorite: payload.favorite }),
        ...(payload.avatar && { avatar: payload.avatar }),
        ...(payload.origin && {
            origin_farm: payload.origin.farm,
            origin_region: payload.origin.region,
            origin_batch: payload.origin.batch
        })
    };
}

async function createProduct(data) {
    const p = readData(data);
    const [id] = await repo().insert(p);
    return { id, ...p };
}

async function getProducts(filter, paginator) {
    const query = repo();

    if (filter.name)
        query.whereILike("name", `%${filter.name}%`);

    if (filter.favorite !== undefined)
        query.where("favorite", filter.favorite === "true");

    const totalRecords = await query.clone().count("* as total").first();
    const items = await query
        .limit(paginator.limit)
        .offset(paginator.offset);

    return {
        items,
        metadata: paginator.getMetadata(Number(totalRecords.total))
    };
}

async function getProductById(id) {
    return repo().where({ id }).first();
}

async function updateProduct(id, data) {
    const updated = readData(data);
    await repo().where({ id }).update(updated);
    return { id, ...updated };
}

async function deleteProduct(id) {
    return repo().where({ id }).del();
}

async function deleteAll() {
    return repo().del();
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAll
};
