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
				console.log(err);
				return;
			}
			if(user){
				if(user.password === password){
					console.log('登录成功!');
				}else{
					console.log('密码错误!');
				}
			}else{
				console.log('查无此用户');
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
				console.log(err);
				return ; 
			}
			if(user){
				console.log('已存在此用户!');
				return ;
			}
			newUser.save(function(err,user){
				if(err){
					console.log(err);
					return ; 
				}
				console.log('注册成功!',user);
			});	

		})
	})
};

