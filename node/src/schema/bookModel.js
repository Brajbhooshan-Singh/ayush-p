const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    author:{
        type:String,
        required:[true, 'Please provide author_name!']
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:[true, 'Please provide description!']
    },
    published_year:{
        type:Date,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
}, {timestamps:true});

const Book = mongoose.model('book', bookSchema);
module.exports = Book;