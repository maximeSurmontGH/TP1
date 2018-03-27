let express = require('express');
let router = express.Router();

let users = require('../data');

router.post('/', function(req, res){
	if(req.body.user && req.body.password){
		users.push(req.body);
		res.send();
	}
});

module.exports = router;
