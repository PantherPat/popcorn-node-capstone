const { User } = require("./models/users");
var ObjectId = require('mongodb').ObjectID;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { JWT_SECRET } = require("./config");
const opts = {};


opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(
  new JWTStrategy(opts, (jwtPayload, callback) => {
    const id = jwtPayload._id;
    return User.find(ObjectId(id))
      .then(user => {
        return callback(null, user);
      })
      .catch(err => {
        return callback(err);
      });
  })
);

// Passport middleware will handle user login
passport.use("login", new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      console.log("passport.js, line 34");
      return User.findOne({ email: email })
        .then(user => {
          console.log(user.username, "passport.js, line 37");
          const validated = user.validatePassword(password);
          validated.then(isValid => {
            // Validate password matches with the corresponding hash stored in the database
            if (!isValid) {
              console.log('wrong!, line 48 passport.js');
              return done(null, false, { message: "Incorrect password." });
            }
            console.log("passport.js line 50", user);
            //Send the user information to the next middleware
            return done(null, user);
          });
        })
        .catch(err => {
          // No user found in the database
          return done(null, false, { message: "User does not exist." });
        });
    }
  )
);
