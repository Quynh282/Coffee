const ApiError = require('../api-error');
const JSend = require('../jsend');

function methodNotAllowed(req, res, next) {
    if (req.route) {
        const methods = Object.keys(req.route.methods)
            .filter(method => method !== '_all')
            .map(method => method.toUpperCase());
        return next(new ApiError(405, 'Method Not Allowed', { Allow: methods.join(', ') }));
    }
    next();
}

function resourceNotFound(req, res, next) {
    return next(new ApiError(404, 'Resource not found'));
}

function handleError(error, req, res, next) {
    if (res.headersSent) return next(error);

    const status = error.statusCode || 500;
    const msg = error.message || 'Internal Server Error';

    return res
        .status(status)
        .set(error.headers || {})
        .json(status >= 500 ? JSend.error(msg) : JSend.fail(msg));
}

module.exports = {
    methodNotAllowed,
    resourceNotFound,
    handleError,
};
