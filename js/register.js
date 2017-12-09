function showUser() { //显示和隐藏注册用户名的相关提示信息
	var bstop = false;
	var $accountA = $('.have-account a');
	var $formaccount = $('#form-account');
	$accountA.hover(function() {
		$accountA.css({
			'text-decoration': 'underline'
		});
	}, function() {
		$accountA.css({
			'text-decoration': 'none'
		});
	});
	$formaccount.on('focus', function() {
		if($(this).attr('placeholder') == '您的账户名和登录名') {
			$(this).attr('placeholder', '')
			$(this).parent().siblings('.input-tip').show();
		}
		bstop = false;
	});
	$formaccount.on('blur', function() {
		var accountreg = /^[\u4e00-\u9fa5a-zA-Z0-9\-\_]{4,20}$/g;
		if($(this).attr('placeholder') == '') {
			$(this).attr('placeholder', '您的账户名和登录名')
			$(this).parent().siblings('.input-tip').hide();
			bstop = false;
		} else if(accountreg.test($formaccount.value)) {
			bstop = true;
		} else {
			
			
			
			bstop = false;
		}
	});
}
showUser();

/*随机验证码*/
function randomCode() {
	var code = '';
	var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	for(var i = 0; i < 4; i++) {
		code += arr[Math.floor(Math.random() * arr.length)]
	}
	return code;
}

function imgCode() { //生成验证码，点击更改验证码
	var $imgcode = $('.img-code');
	$imgcode.html(randomCode());
	$imgcode.on('click', function() {
		$imgcode.html(randomCode());
	});
}
imgCode();
function phoneCode() { //生成验证码，点击更改验证码，赋给前面的接收框
	var $phone = $('.phone-code');
	var $phonecode=$('#phonecode');
	$phone.on('click', function() {
		$phonecode.val(randomCode());
	});
}
phoneCode();
