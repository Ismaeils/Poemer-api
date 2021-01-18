const mongoose = require('mongoose');
const {Note, noteSchema} = require('./note');
const jwt = require('jsonwebtoken');
const fs   = require('fs');
const config = require('config');
const userSchema = new mongoose.Schema({
    providerId:{
        type: String,
    },
    name:{
        type: String,
        requierd: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true,
    },
    notes: {
        type: [noteSchema],
    }
});

userSchema.methods.generateAuthToken = function(){
    var privateKEY  = fs.readFileSync('models/private.key', 'utf8');
    const expiresIn = "1d";
    const payload = {
        sub: this._id,
        iat: Date.now()
    }
    const token = jwt.sign(payload, privateKEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256'
    });
    return {
        token: "Bearer " + token,
        expires: expiresIn
    };
}

const User = mongoose.model('User', userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;