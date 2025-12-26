var { StatusCodes } = require('http-status-codes');
var { appointmentModel, userModel } = require('../models');

var getAppointmentsByUser = async (req, res, next) => {
    // REQUEST BODY
    console.log('username', username);
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

    // REQUEST PARAM
    var listAppointment = user.role === 'ADMIN' ? await appointmentModel.find() : await appointmentModel.find({ user });

    // SENT SUCCESS RESPONSE
    res.status(StatusCodes.OK).json({
        message: 'All appointments has been fetched',
        data: { appointments: listAppointment },
    });
};

var createAppointment = async (req, res, next) => {
    // REQUEST BODY
    var { title, description, color, startDate, endDate, username } = req.body || {};

    // CURRENT USER
    var user = await userModel.findOne({ username });
    if (!user) {
        next({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: 'User not found',
        });
        return;
    }

    // REQUEST PARAM
    var newAppointment = await appointmentModel.create({
        title,
        description,
        color,
        startDate,
        endDate,
        user,
    });

    // SENT SUCCESS RESPONSE
    res.status(StatusCodes.OK).json({
        message: 'New appointment has been created',
        data: { appointment: newAppointment },
    });
};

var updateAppointment = async (req, res, next) => {
    // REQUEST BODY
    var { id, title, description, color, startDate, endDate, username } = req.body || {};

    // CURRENT USER
    var user = await userModel.findOne({ username });
    if (!user) {
        next({
            statusCode: StatusCodes.NOT_FOUND,
            statusMessage: 'User not found',
        });
        return;
    }

    // REQUEST PARAM
    var newAppointment = await appointmentModel.findByIdAndUpdate(id, {
        title,
        description,
        color,
        startDate,
        endDate,
        user,
    });

    // SENT SUCCESS RESPONSE
    res.status(StatusCodes.OK).json({
        message: 'Your appointment has been updated',
        data: { appointment: newAppointment },
    });
};

var deleteAppointment = async (req, res, next) => {
    // REQUEST BODY
    var { appointmentId } = req.params || {};

    // REQUEST PARAM
    await appointmentModel.findByIdAndDelete(appointmentId);

    // SENT SUCCESS RESPONSE
    res.status(StatusCodes.OK).json({
        message: 'Appointment has been deleted',
        data: { appointment: undefined },
    });
};

module.exports = {
    createAppointment,
    updateAppointment,
    getAppointmentsByUser,
    deleteAppointment,
};
