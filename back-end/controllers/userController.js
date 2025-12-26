var { StatusCodes } = require('http-status-codes');
var { userModel } = require('../models');

var getUserByUsername = async (req, res, next) => {
    var { username } = req.params || {};

    // CURRENT USER
    var user = await userModel.findOne({ username });
    if (!user) {
        next({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: 'User not found',
        });
        return;
    }

    // SENT SUCCESS RESPONSE
    res.status(StatusCodes.OK).json({
        message: 'User has been fetched',
        data: { user },
    });
};

module.exports = {
    getUserByUsername,
};
