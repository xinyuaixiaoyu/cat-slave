const mongoose = require('mongoose');

module.exports = mongoose.model(
  'user',
  mongoose.Schema({
    userId: String,
    name: String,
    password: String,
    email: String,
    repeatPassword: String,
    avator: String
  })
);
