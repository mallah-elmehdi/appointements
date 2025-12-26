var mongoose = require('mongoose');

// SCHEMA
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['ADMIN', 'USER'],
        },
    },
    { timestamps: true }
);

// MODEL
const user = mongoose.model('user', schema);

module.exports = user;
