require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const { Console } = require('console');

// Server logs 
const output = fs.createWriteStream('./server.log', { flags: 'a' });
const errorOutput = fs.createWriteStream('./error.log', { flags: 'a' });

const logger = new Console({ stdout: output, stderr: errorOutput });

global.INFO = (...args) => logger.log(Date(), '|', 'INFO', '|', ...args);
global.ERROR = (...args) => logger.error(Date(), '|', 'ERROR', '|', ...args);

// Global URL 
global.API_URL = require('./api.config').BASE_URL;
global.CLIENT_URL = require('./api.config').CLIENT_URL;

// Global DB connection 
const connection = require('./db.config');
connection();
// global.DBQuery = async (sql) => {
//     const promise = new Promise((resolve, reject) => {
//         DBConnection.query(sql, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             };
//         });
//     });
//     return await promise.catch(error => error);
// };

// Global root dir 
global.ROOT_DIR = path.resolve(__dirname);

// Include all created routers
const RoutesCustom = require('./src');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json 
app.use(express.json());

// Server static files 
app.use(express.static('public'));
app.use(express.static('uploads'))

// Enable cors 
app.use(cors({credentials:true, origin:'http://localhost:3000'}));

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cookieParser());

// Use custom routes in app 
new RoutesCustom(app);

// 404  middleware
app.use(function (req, res, next) {
    res.statusCode = 404;
    res.end();
});

// Internal server error  middleware
app.use(function (err, req, res, next) {
    ERROR(err);
    res.statusCode = 500;
    res.end();
});


app.listen(process.env.PORT, (err) => {
    if (err) console.error(err);
    else console.log(`Application running on port ${process.env.PORT}`);
});