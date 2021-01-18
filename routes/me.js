const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session:false}),async(req,res)=>{
    console.log(req.user.notes);
    let notes = req.notes;
    res.json({success: true, msg: `Hello ${req.user.name}, this is your profile.`});
});

module.exports = router;

//Papers
//