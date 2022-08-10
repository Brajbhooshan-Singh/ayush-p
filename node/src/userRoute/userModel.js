const Book = require("../schema/bookModel");
const User = require("../schema/userModel");

const SYSTEM_ERROR = 'An error occurred, please refer to the system administrator!';


const addBookModel = async (user_id, author, title, description, published_year, language, callback) => {
    const book = new Book({ user_id, author, title, description, published_year, language });
    book.save().then(result => {
        callback(result);
    }).catch(err => {
        callback(false, SYSTEM_ERROR);
    });
}

const getBookModel = async (user_id, callback) => {
    Book.find({ user_id: user_id }, (err, books) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else {
            callback(books);
        }
    });
}

const deleteBookModel = async (user_id, _id, callback) => {
    Book.deleteOne({ _id: _id }, (err, books) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else {
            callback(books);
        }
    });
}

const editBookModel = async (user_id, author, title, description, published_year, language, role, _id, callback) => {
    Book.updateOne({ _id: _id }, { $set: { author, title, description, published_year, language, role } }, (err, books) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else {
            callback(books);
        }
    });
}

const tokenModel = (user_id, callback) => {
    User.findOne({ _id: user_id }, (err, user) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else {
            callback({ __id: user._id, status: user.status, role: user.role });
        }
    });
}

module.exports = { addBookModel, getBookModel, deleteBookModel, editBookModel, tokenModel };