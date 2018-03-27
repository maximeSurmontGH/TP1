let express = require('express');
let router = express.Router();

let users = require('../data');

function makeToken() {
	let token = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 24; i++)
		token += possible.charAt(Math.floor(Math.random() * possible.length));

	return token;
}

router.post('/', function(req, res) {
	const userToTest = req.body;
	let connected = false;
	let token = makeToken();

	for(let user of users){
		if(userToTest.login === user.login && userToTest.password === user.password && !user.isConnected){
			user.token = token;
			user.isConnected = true;
			connected = true;
		}
	}

	if(connected){
		res.cookie('token', token, {maxAge: 900000, httpOnly:true});
		res.send();
	}else{
		res.status(403);
		res.send();
	}
});

module.exports = router;
