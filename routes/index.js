var crypto = require('crypto'),
	User = require('../models/user.js');
module.exports = function(app){
	app.get('/', function(req, res) {
	  res.render('index', { title: 'Test' });
	});

	app.post('/login',function(req,res){
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name : req.body.username,
			password : password
		});
		newUser.get(function(err,user){
			if(err){
				res.json({code:1,message:err});
			}
			if(user){
				if(user.password === password){
					res.json({code:0});
				}else{
					res.json({code:1,message:"密码错误!"});
				}
			}else{
				res.json({code:1,message:"查无此用户"});
			}
		})

	});

	app.post('/reg',function(req,res){
		var name = req.body.username;
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name : name,
			password : password
		});
		newUser.get(function(err,user){
			if(err){
				res.json({code:1,message:err});
			}
			if(user){
				res.json({code:1,message:"已存在此用户!"});
			}
			newUser.save(function(err,user){
				if(err){
					res.json({code:1,message:err});
				}
				res.json({code:0});
			});	

		})
	});

	app.get('/timer',function(req,res){
		const TIMER_TYPE_1 = 25;//工作时间
		const TIMER_TYPE_2 = 3;//休息时间
		let start = new Date().getTime();
	});

	app.get('/manage',function(req,res){
		res.render('manage');
	});
};

