var mongoose = require('mongoose');

// SCHEMA
const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        color: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'user',
            require: true,
        },
    },
    { timestamps: true }
);

// MODEL
const appointment = mongoose.model('appointment', schema);

module.exports = appointment;
