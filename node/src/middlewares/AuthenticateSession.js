const jwt = require('jsonwebtoken');

module.exports = AuthenticateSession = (req, res, next) => {
    // Get auth header value 
    // const bearerHeader = req.headers['authorization'];
    const token = req.cookies['token']

    // Check if bearer is undefined
    if (typeof token !== 'undefined') {
        // Split at the space 
        // const bearer = bearerHeader.split(' ');

        // Get token from array  
        // const bearerToken = bearer[1];

        // Set the token 
        // req.token = bearerToken;
        req.token = token;

        // Verify token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, data) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            if (req.method === 'GET') {
                req.query.user_id = data.user._id;
                req.query.role = data.user.role;
            } else if (req.method === 'POST')
                req.body.user_id = data.user._id;
            req.body.role = data.user.role;
            next();
        });
    } else {
        res.sendStatus(403);
        return;
    }
}