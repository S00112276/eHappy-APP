'use strict';

module.exports = function(app) {
    var users = require('../controllers/userController');

app.route('/register')
    .post(users.registerUser);

app.route('/authenticate')
    .post(users.AuthenticateUser);

app.route('/profile')
    .get(users.GetProfile);
}