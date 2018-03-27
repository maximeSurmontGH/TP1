let express = require('express');
let router = express.Router();

var data = require('../data');

router.get('/:key/tasks', function(req, res, next) {
	let key = req.params.key;

	let tasks = [];

	if(data.keys.indexOf(key) >= 0){
		for(let user of data.users){
			if(user.key === key){
				tasks = user.tasks;
			}
		}

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send({tasks: tasks});
	}else{
		let err = new Error('Unauthorized');
		err.status = 503;
		next(err);
	}
});

router.post('/:key/tasks', function(req, res, next) {
	let key = req.params.key;
	var task = req.body;

	if(data.keys.indexOf(key) >= 0){
		for(let user of data.users){
			if(user.key === key){
				if(user.tasks.length > 0){
					task.id = user.tasks[user.tasks.length-1].id+1;
				}else{
					task.id = 0;
				}
				user.tasks.push(task);
			}
		}

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send(task);
	}else{
		var err = new Error('Unauthorized');
		err.status = 503;
		next(err);
	}
});

router.delete('/:key/tasks/:id', function(req, res, next) {
	let key = req.params.key;

	let id = req.params.id;

	if(data.keys.indexOf(key) >= 0){
		for(let user of data.users){
			if(user.key === key){
				for(let task of user.tasks){
					if(task.id == id){
						user.tasks.splice(user.tasks.indexOf(task) ,1);
					}
				}
			}
		}

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send();
	}else{
		var err = new Error('Unauthorized');
		err.status = 503;
		next(err);
	}
});

router.put('/:key/tasks/:id', function(req, res, next) {
	let key = req.params.key;

	let id = req.params.id;

	if(data.keys.indexOf(key) >= 0){
		for(let user of data.users){
			if(user.key === key){
				for(let task of user.tasks){
					if(task.id == id){
						task.name = req.body.name;
					}
				}
			}
		}

		res.setHeader('Access-Control-Allow-Origin', '*');
		res.send();
	}else{
		var err = new Error('Unauthorized');
		err.status = 503;
		next(err);
	}
});

module.exports = router;