var mongodb = require('./db');

function User(user){
	this.name = user.name;
	this.password = user.password;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback){
	var user = {
		name : this.name,
		password : this.password
	};

	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取users集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将用户数据插入users集合
			collection.insert(user,{
				safe:true
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user[0]);
			});
		});
	});
};

//用户信息获取
User.prototype.get = function(callback){
	//打开数据库
	var name = this.name;
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取colloctions
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({
				name : name
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				return callback(null,user);
			})
		});
	})
};