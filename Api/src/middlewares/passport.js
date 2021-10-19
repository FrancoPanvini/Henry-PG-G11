const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken")
const { Users } = require("../db")
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "mail",
        passwordField: "password",
        session: false,
      },
      async (mail, password, done) => {
        try {
          const user = await Users.findOne({
            where: {
              mail,
            },
          });
          if (!user) {
            return done(null, false);
          }
          if(user.password){
            bcrypt.compare(password, user.password).then((response) => {
              if (response !== true) {
                return done(null, false, "password");
              }
              console.log("User found & Authenticated");
              return done(null, user);
            });
          }
          /* else{
            done(null, false, "googleFacebook")
          } */
        } catch (err) {
          done(err);
        }
      }
    )
  );
  
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: "jwt-secret",
  };
  
  //Validate JWT
  passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        Users.findOne({
          where: {
            id: jwt_payload.id,
          },
        }).then((Users) => {
          if (Users) {
            done(null, Users);
          } else {
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: "35151553938-tfc222svo6g482tcv97mancdkr8gkmel.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: `http://localhost:3001/auth/google/callback`,
        session: false,
      },
      async (accessToken, refreshToken, profile, done) => {
        const googleUser = profile._json;
        try {
          let user = await Users.findOne({ where: {mail: googleUser.email} })
          if(!user){
            user = await Users.create({
              name: googleUser.name,
              mail: googleUser.email,
              photo: googleUser.picture,
              CityId: 1,
              UsersTypeId:'i'
            })
          }
          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  

passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, "jwt-secret", (err, user) => {
        if (err) return done(err);
        return done(null, user ? user : false);
      });
    })
  );

  module.exports = passport;
