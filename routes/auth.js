const express = require('express');
const router = express.Router();
const {User} = require('../models/user'); 
const bcrypt = require('bcrypt');
const _ = require('lodash');
const passport = require('passport');

router.post('/', async (req,res)=>{
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    
    const token = user.generateAuthToken();
    
    res.json({
        success: true,
        user: _.pick(user, ['_id','name', 'email']), 
        token: token.token, 
        expiresIn: token.expires});
});


router.get('/google',
  passport.authenticate('google', { session:false, scope:
      [ 'email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        session: false,
        //successRedirect: 'api/auth/google/success',
        failureRedirect: 'api/auth/google/failure'
}), (req,res)=>{
    if(req.user){
        let user = req.user;
        console.log(`User From Request: ${user}`);
        const token = user.generateAuthToken();
        const response = {
            success: true,
            //msg:`Welcome Mr ${req.user.name}`,
            user: _.pick(user, ['_id','name', 'email']), 
            token: token.token, 
            expiresIn: token.expires};
        //res.json();
          console.log(response);
          //console.log(res);
        
        res.set({
            'Content-Type': 'application/json',
            'Authorization': token.token
        }).redirect('https://poemer.herokuapp.com/me');
        //res.send(response);
    }
    
});

router.get('/google/failure', (req,res)=> res.send('You failed to login'));
router.get('/google/success', passport.authenticate('jwt', {session:false}), (req,res)=> res.send('Congrats, You are signed in!'));

router.get('/logout', (req,res)=>{
    console.log('Logout is handled via Frontend!');
});


module.exports = router;