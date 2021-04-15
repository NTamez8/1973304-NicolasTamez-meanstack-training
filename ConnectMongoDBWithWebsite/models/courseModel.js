const mongoose = require('mongoose');


let schema = mongoose.Schema;

let courseSchema = new schema({
    _id:Number,
    courseName:String,
    description:String,
    amount:Number
});

module.exports = mongoose.model('courses',courseSchema);