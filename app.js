const winston = require('winston');
const express = require('express');
const passport = require('passport');
const config = require('config');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://poemer.herokuapp.com/');

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


require('./config/passport')(passport);
app.use(passport.initialize());
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);



//const server = app.listen(config.get('port'), ()=>winston.info(`Server has started at ${config.get('port')}`));
const server = app.listen(process.env.PORT || 8080);
const edited = "whatever";
module.exports = server;