const express = require('express');
const getAuth = require('./services/auth_services/getAuth');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', getAuth);

module.exports = router;
