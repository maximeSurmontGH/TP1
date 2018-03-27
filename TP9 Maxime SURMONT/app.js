let fs = require('fs');
let https = require('https');
let express = require('express');

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

// router
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
