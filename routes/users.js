const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');

router.route('/register')
    .get(users.register)
    .post(users.createUser);

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true}), users.loginUser);

router.get('/logout', users.logoutUser);

module.exports = router;