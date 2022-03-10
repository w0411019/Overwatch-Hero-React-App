const Mongoose = require("mongoose");
const validator = require('mongoose-validator')

const schema = new Mongoose.Schema({
      email: {type: String, validate: [validator({validator:'isEmail'}) ], required: true, unique: true},
      password: {type: String, required: true, maxLength: 255}

},{
    collection: 'users'
});

module.exports = Mongoose.model('userLogin', schema);