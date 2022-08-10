const express = require('express');

const AuthenticateSession = require('../middlewares/AuthenticateSession');
const userController = require('./userController');

const router = express.Router();

const user = new userController;

router.post('/books', AuthenticateSession, user.addBook);
router.get('/books', AuthenticateSession, user.getBook);
router.post('/books/delete', AuthenticateSession, user.deleteBook);
router.post('/books/edit', AuthenticateSession, user.editBook);
router.get('/token', AuthenticateSession, user.token);

module.exports = router;