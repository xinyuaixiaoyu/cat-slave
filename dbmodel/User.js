const mongoose = require('mongoose')

module.exports = mongoose.model(
    'user',
    mongoose.Schema({
        name: String,
        password: String,
        email: String
    })
)