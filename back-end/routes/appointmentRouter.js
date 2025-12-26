var express = require('express');
var { createAppointment, updateAppointment, getAppointmentsByUser, deleteAppointment } = require('../controllers');

// ROUTER
var router = express.Router();

// USER APPOINTMENT CONTROL
router.route('/').post(createAppointment).put(updateAppointment);
router.route('/:appointmentId').delete(deleteAppointment);
router.route('/:username').get(getAppointmentsByUser);

module.exports = router;
