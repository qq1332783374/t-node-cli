const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../lib/mongo').User;
const keys = require('../config/default');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(false, null)
            })
            .catch(err => {
                console.log(err)
            }) 
    }));
}