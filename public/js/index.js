var oIndex = {
	event:function(){
		var $regForm = $('#reg-form'),$logForm = $('#login-form');
		$('.gotoReg').on('click',function(){
			//前往注册
			$regForm.show();
			$logForm.hide();
		});
		$('.gotoLog').on('click',function(){
			//前往登录
			$regForm.hide();
			$logForm.show();
		});
		$('#login-btn').on('click',function(){
			//登录功能
			var username = $('#l-username').val(),
				password = $('#l-password').val();
			if(username.length == 0){
				alert('用户名不能为空!');
				return ;
			}
			if(password.length == 0){
				alert('密码不能为空!');
				return ;
			}
			$.post("/login",{
				username : username,
				password : password
			},function(data){
				if(data.code=='1'){
					alert(data.message);
				}else{
					location.href="/manage";
				}
			},'json');
		});
		$('#reg-btn').on('click',function(){
			//注册功能
			var username = $('#r-username').val(),
				password = $('#r-password').val(),
				rePassword = $('#re-password').val();
			if(username.length == 0){
				alert('用户名不能为空!');
				return ;
			}
			if(password.length == 0){
				alert('密码不能为空!');
				return ;
			}
			if(password!==rePassword){
				alert('两次密码不一致!');
				return;
			}
			$.post("/reg",{
				username : username,
				password : password
			},function(data){
				if(data.code=='1'){
					alert(data.message);
				}else{
					location.href="/manage";
				}
			},'json');
		})
	},
	init:function(){
		this.event();
	}
};

$(function(){
	oIndex.init();
});