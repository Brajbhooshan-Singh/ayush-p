const outerRoute = require('./outerRoute');
const userRoute = require('./userRoute');

class RoutesCustom {
    constructor(app){
        app.use('/api', outerRoute);
        app.use('/api/user', userRoute);
    };
};

module.exports = RoutesCustom;