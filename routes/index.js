module.exports = function(app){
	app.get('/', function(req, res) {
	  res.render('index', { title: 'Test' });
	});

	app.post('/login',function(req,res){
		console.log(req.body.username);
		console.log(req.body.password);
	});
};

