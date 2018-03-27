let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let login = require('./routes/login');
let userProfile = require('./routes/userProfile');
let users = require('./routes/users');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendfile("./public/views/login.html");
});
app.get('/login', function(req, res) {
	res.sendfile("./public/views/login.html");
});
app.get('/index', function(req, res) {
	res.sendfile("./public/views/login.html");
});
app.get('/loginError', function(req, res) {
	res.sendfile("./public/views/loginError.html");
});
app.post('/disconnect', function(req, res) {
	res.cookie('token', '', {maxAge: 0});
	res.send();
});

app.use('/login', login);
app.use('/users', users);
app.use('/userProfile', userProfile);

module.exports = app;

