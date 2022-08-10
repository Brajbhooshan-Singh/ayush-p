const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../schema/userModel");
const Book = require('../schema/bookModel');

const SYSTEM_ERROR = 'An error occurred, please refer to the system administrator!';

const loginModel = async (email, password, res, callback) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    ERROR(err);
                    callback(false, SYSTEM_ERROR);
                } else if (!result) {
                    callback(false, 'Password does not match!');
                } else {
                    jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, { expiresIn: '7 days' }, async (err, token) => {
                        if (err) {
                            ERROR(err);
                            callback(false, SYSTEM_ERROR);
                        }
                        else {
                            res.cookie('token', token, { expires: new Date(Date.now() + (1000 * 60 * 60 * 48)), httpOnly: true })
                            callback({ __id: user._id, token, status: user.status, role:user.role});
                        }
                    });
                }
            });
        } else{
            callback(false, 'No user exist!')
        }
    });
}

const registerModel = (first_name, last_name, email, phone_no, password, address, role, callback) => {
    User.findOne({ email: email }, (err, result) => {
        if (err) {
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else if (result) {
            callback(false, 'User already exist!')
        } else {
            bcrypt.hash(password, 10, (err, hashPassword) => {
                if (err) {
                    callback(false, SYSTEM_ERROR);
                } else {
                    const user = new User({ first_name: first_name, last_name: last_name, email: email, phone_no: phone_no, password: hashPassword, address: address, role: role });
                    user.save().then(result => {
                        callback(result);
                    }).catch(err => {
                        callback(false, SYSTEM_ERROR);
                    });
                }
            });
        }
    });
}

const viewAllModel = async (callback) => {
    Book.find((err, books)=>{
        if(err){
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else{
            callback(books);
        }
    });
}

const tenMinuteOlderModel = async (callback) => {
    let newDate = new Date();
    Book.find({createdAt: { // 10 minutes ago (from now)
        $lt: new Date(newDate.getTime() - 1000 * 60 * 10)
    }}, (err, books)=>{
        if(err){
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else{
            callback(books);
        }
    });
}

const tenMinuteEarlierModel = async (callback) => {
    let newDate = new Date();
    Book.find({createdAt: { // 10 minutes earlier (from now)
        $gt: new Date(newDate.getTime() - 1000 * 60 * 10)
    }}, (err, books)=>{
        if(err){
            ERROR(err);
            callback(false, SYSTEM_ERROR);
        } else{
            callback(books);
        }
    });
    
}

module.exports = { loginModel, registerModel, viewAllModel, tenMinuteOlderModel, tenMinuteEarlierModel };