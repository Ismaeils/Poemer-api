const winston = require('winston');
const express = require('express');
const passport = require('passport');
const config = require('config');
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({origin: '*'}));

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