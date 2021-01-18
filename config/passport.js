const ExtractJWT = require("passport-jwt").ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const config = require('config');
const {User} = require('../models/user');
const fs = require('fs');
var publicKEY  = fs.readFileSync('config/public.key', 'utf8');

//Google Setup

const googleOptions = {
    clientID:     '956610697166-ilj8dp5aiog42vi26nbms0ip9f8topfh.apps.googleusercontent.com',
    clientSecret: '99NH4mEBoeLKKkbnXXaKsHN3',
    callbackURL: "http://localhost:9000/api/auth/google/callback",
    passReqToCallback   : true
};

const options = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKEY,
    algorithms: ['RS256']
};

const googleStrategy = new GoogleStrategy(googleOptions, 
    function(request, accessToken, refreshToken, profile, done) {
        User.findOne({ providerId: profile.id }, 
            async (err, user)=>{
                if(err){
                    return done(err);
                }
                if(!user){
                    let user = new User({
                        providerId: profile.id,
                        name: profile.displayName,
                        email: profile.email,
                        password: 'null'
                    });
                    await user.save(err=>{
                        if(err) console.log(err);
                        return done(err,user);
                    });
                }else{
                    return done(err, user);
                }
        }).catch(err=> done(err, null));
});
const strategy = new JwtStrategy(options, (payload, done)=>{
    User.findOne({_id: payload.sub})
        .then((user)=>{
            if(user){
                return done(null, user);
            }   else{
                return done(null,false);
            }
        }).catch(err=> done(err,null));
});



module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(strategy);
    passport.use(googleStrategy);

    
}