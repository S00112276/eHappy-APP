const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/models/userModel');
const config = require('../config/database');
//var isPlainObject = require('lodash.isplainobject');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
     console.log(jwt_payload);
   //   print (jwt_payload);
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}