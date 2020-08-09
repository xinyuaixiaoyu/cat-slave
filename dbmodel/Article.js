const mongoose = require('mongoose');

module.exports = mongoose.model(
    'article',
    mongoose.Schema({
        id: String,
        title: String,
        describe: String,
        category: String,
        article: String
    },{
        timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
      },
    }
  )
);
