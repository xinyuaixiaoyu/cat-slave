const mongoose = require('mongoose')

module.exports = mongoose.model(
    'article',
    mongoose.Schema({
        _id: String,
        title: String,
        describe: String,
        category: String,
        articleDetail: String
    })
)