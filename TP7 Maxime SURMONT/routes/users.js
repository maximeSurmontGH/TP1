let express = require('express');
let router = express.Router();

var data = require('../data');

// Generate a key
function makeKey() {
	let key = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < 24; i++)
		key += possible.charAt(Math.floor(Math.random() * possible.length));

	return key;
}

// Create a key and return it
router.post('/', function(req, res, next) {
	let key = makeKey();
	data.keys.push(key);
	data.users.push({key: key, tasks: []});

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send({id: key});
});

module.exports = router;
