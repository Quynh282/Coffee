function success(data = null) {
    return {
        status: "success",
        data
    };
}

function fail(message, data = null) {
    return {
        status: "fail",
        message,
        data
    };
}

function error(message, data = null) {
    return {
        status: "error",
        message,
        data
    };
}

module.exports = { success, fail, error };
