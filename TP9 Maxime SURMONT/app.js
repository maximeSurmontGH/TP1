let fs = require('fs');
let https = require('https');
let express = require('express');
/*let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let login = require('./routes/login');
let chat = require('./routes/chat');
let users = require('./routes/users');*/

let app = express();

// https server
var options = {
	key: fs.readFileSync('./sslcert/key.pem'),
	cert: fs.readFileSync('./sslcert/cert.pem')
};
var serverPort = 8443;

var server = https.createServer(options, app);

// web socket
var io = require('socket.io')(server);

/*
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// router
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
app.use('/chat', chat);*/

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("hello");
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

server.listen(serverPort, function() {
	console.log('server up and running at %s port', serverPort);
});
