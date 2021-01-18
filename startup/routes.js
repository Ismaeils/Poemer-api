const auth = require('../routes/auth');
const helmet = require('helmet');
const users = require('../routes/users');
const me = require('../routes/me');
module.exports = function(app){

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://poemer.herokuapp.com');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

    //App.uses
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/me', me);
}