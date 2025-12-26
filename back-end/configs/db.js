const mongoose = require('mongoose');

// MONGODB CONNECTION
mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error(err);
    });
