const Mongoose = require("mongoose");

const schema = new Mongoose.Schema({
    charactername: {
        heroname: {type: String, required: true},  
        fullname: {
            firstname: {type: String, required: false, minLength: 3, maxLength: 50},
            lastname: {type: String, required: false, minLength: 3, maxLength: 50}
        }
    }, 
    role: {type: String, enum: ['Tank','Support','Damage'], required: true},
    healthpoints: {type: Number, required: true},
    shields: {type: Number, required: true},
    difficultyrating: {type: Number, required: true},
    abilities: [String],
    image: {type: String, required: true},  

},
{
    collection: 'heros'
});
module.exports = Mongoose.model('Hero', schema);