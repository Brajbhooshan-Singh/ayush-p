const express = require('express');
// const { upload } = require('../../multer.config');
const AuthenticateSession = require('../middlewares/AuthenticateSession');

const outerController = require('./outerController');

const router = express.Router();

const outer = new outerController;

router.post('/register', outer.register);
router.post('/login', outer.login); 
router.get('/books', AuthenticateSession, outer.viewAll);
router.get('/logout', AuthenticateSession, outer.logout); 


module.exports = router