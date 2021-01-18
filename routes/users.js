const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user'); 
const bcrypt = require('bcrypt');
const passport = require('passport');


router.get('/me', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    
    //const user = await User.findById(req.user._id).select('-password');
    res.json({success: true, msg: 'You are authorized!'});
});

router.post('/', async (req,res)=>{
    // const { error } = validate(req.body);
    // if(error) return res.send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    
    const token = user.generateAuthToken();
    //res.header('x-auth-token',token).send(_.pick(user, ['_id','name', 'email']));
    res.json({
        success: true,
        user: _.pick(user, ['_id','name', 'email']), 
        token: token.token, 
        expiresIn: token.expires});

});

router.put('/:id', async (req,res)=>{

    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    try{
        const result = await User.updateOne({_id: req.params.id},req.body);
        res.send(result);
    }catch(err){
        res.send(err.message);
    }
});

router.delete('/:id', async (req,res)=>{
    try{
        const result = await User.deleteOne({_id: req.params.id});
        res.send(result);
    }catch(err){
        res.send(err.message);
    }
});


module.exports = router;
