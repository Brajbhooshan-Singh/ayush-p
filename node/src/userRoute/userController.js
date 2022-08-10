const { Db } = require('mongodb');
const { addBookModel, getBookModel, deleteBookModel, editBookModel, tokenModel } = require('./userModel')

class userController {

    addBook(req, res) {
        const { user_id, author, title, description, published_year, language, role } = req.body;
        if(role.includes('CREATOR')){
            addBookModel(user_id, author, title, description, published_year, language, (data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data == false) {
                    response.status = 0;
                    response.error = err;
                }
                else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response);
            });
        } else{
            let response = {status:0, data:false, error:'You are not creator!'};
            res.send(response);
        }
        
    }

    getBook(req, res) {
        const { user_id, role } = req.query;
        if(role.includes('VIEWER')){
            getBookModel(user_id, (data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data == false) {
                    response.status = 0;
                    response.error = err;
                }
                else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response);
            });
        }
        else{
            let response = {status:0, data:false, error:'You are not viewer!'};
            res.send(response);
        }
    }

    deleteBook(req, res) {
        const { user_id, role, _id } = req.body;
        if(role.includes('CREATOR')){
            deleteBookModel(user_id, _id, (data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data == false) {
                    response.status = 0;
                    response.error = err;
                }
                else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response);
            });
        }
        else{
            let response = {status:0, data:false, error:'You are not creator!'};
            res.send(response);
        }
    }

    editBook(req, res) {
        const { user_id, author, title, description, published_year, language, role, _id } = req.body;
        if(role.includes('CREATOR')){
            editBookModel(user_id, author, title, description, published_year, language, role, _id, (data, err) => {
                let response = { status: 0, data: data, error: null };
                if (data == false) {
                    response.status = 0;
                    response.error = err;
                }
                else {
                    response.status = 1;
                    response.data = data;
                }
                res.send(response);
            });
        }
        else{
            let response = {status:0, data:false, error:'You are not creator!'};
            res.send(response);
        }
    }

    token(req, res) {
        const { user_id } = req.query;
        tokenModel(user_id, (data, err) => {
            let response = { status: 0, data: data, error: null };
            if (data == false) {
                response.status = 0;
                response.error = err;
            }
            else {
                response.status = 1;
                response.data = data;
            }
            res.send(response);
        });
    }
}

module.exports = userController;