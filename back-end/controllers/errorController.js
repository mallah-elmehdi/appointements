var { ReasonPhrases, StatusCodes } = require('http-status-codes');

var errorController = (err, req, res, next) => {
    // logging the stack
    console.error('err:', err);

    // sending the error object
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: err.statusMessage || ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};

module.exports = {
    errorController,
};
