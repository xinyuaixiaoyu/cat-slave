const mongoose = require('mongoose')

module.exports = mongoose.model(
    'category',
    mongoose.Schema({
        name: String,
        categoryId: String,
        current: Number,
        pageSize: Number
    })
)