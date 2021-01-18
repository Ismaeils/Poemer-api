const auth = require('../routes/auth');
const helmet = require('helmet');
const users = require('../routes/users');
const me = require('../routes/me');
module.exports = function(app){

    //App.uses
    app.use('/api/auth', auth);
    app.use('/api/users', users);
    app.use('/api/me', me);
}