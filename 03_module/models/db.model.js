const mongoose = require('mongoose');
require('dotenv').config();
const MongoURL=process.env.DB_URL
mongoose.connect(MongoURL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

module.exports = mongoose;
