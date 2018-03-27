let express = require('express');
let router = express.Router();

let users = require('../data');

router.get('/', function(req, res){
	let token = req.cookies.token;
	let redirect = true;

	if(token != undefined){
		for(let user of users){
			if(user.token === token){
				redirect = false;
			}
		}
	}

	if(redirect){
		res.redirect('/');
	}else{
		res.sendfile("./public/views/chat.html");
	}
});

module.exports = router;
