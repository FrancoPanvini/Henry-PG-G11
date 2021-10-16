const passport = require("passport");
const jwt = require("jsonwebtoken");

const getAuth = (req, res, next) => {
    passport.authenticate("google", (err, user) => {
        if (err) return next(err);
        if (!user) {
          res.redirect(`http://localhost:3000/login?error=401`);
        } else {
          const token = jwt.sign(user.toJSON(), "jwt-secret");
          res.redirect(`http://localhost:3000/?loginGoogle=true&t=${token}`);
        }
      })(req, res, next);
    };


module.exports = getAuth
