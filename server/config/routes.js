var path = require('path');
var users = require('../controllers/users.js');

module.exports = function (app) {

    app.post('/register', function (req, res) {
        users.createUser(req, res);
    });

    app.post('/login', function (req, res) {
        users.loginUser(req, res);
    });

    app.get('/grabuser', function (req, res) {
        users.grabUser(req, res);
    });

    app.get('/logout', function (req, res) {
        users.logout(req, res);
    });

    app.all('*', function (req, res) {
        res.sendFile(path.resolve('./angular-journal/dist/index.html'));
    });

}