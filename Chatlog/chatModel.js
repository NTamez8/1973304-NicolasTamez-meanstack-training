const mongoose = require('mongoose');

const schema = mongoose.Schema;


let chat = new schema({
    name:String,
    message:String
});

module.exports = mongoose.model('chatLog',chat);