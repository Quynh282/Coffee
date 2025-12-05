const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const productsRouter = require('./routes/products.router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/errors.controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success({ message: 'Coffee API OK' }));
});

app.use('/public', express.static('public'));
productsRouter.setup(app);

app.use(resourceNotFound);
app.use(handleError);

module.exports = app;
