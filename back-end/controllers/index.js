var { errorController } = require('./errorController');
var { createAppointment, updateAppointment, getAppointmentsByUser, deleteAppointment } = require('./appointmentController');
var { getUserByUsername } = require('./userController');

// Export all controllers
module.exports = {
    errorController,
    createAppointment,
    updateAppointment,
    getAppointmentsByUser,
    deleteAppointment,
    getUserByUsername,
};
