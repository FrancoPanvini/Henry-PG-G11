const jwt = require('jsonwebtoken');
const passport = require('passport');

const postLogin = (req, res, next) => {
  passport.authenticate('login', (err, response, info) => {
    if (err) {
      return next(err);
    }

    if (!response) {
      if (info === 'googleFacebook') {
        res.json({ message: 'This account is linked with Google or Facebook. Try again.' });
      } else {
        res.json({ message: 'The password is wrong. Try again.' });
      }
    } else {
      return res.send(jwt.sign(response.toJSON(), 'jwt-secret'));
    }
  })(req, res, next);
};

module.exports = postLogin;
