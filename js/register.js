showUser();

function showUser() { //显示和隐藏注册用户名的相关提示信息
	var $accountA = $('.have-account a');
	$accountA.hover(function() {
		$(this).css('text-decoration', 'underline');
	}, function() {
		$(this).css('text-decoration', 'none');
	});
}

function judeInput(obj) { //判断输入框是否输入，输入全部合法性可跳转。
	var bstop = false;
	var $obj = $(obj);
	var $placeholder = null;

	$obj.on('focus', function() {
		var $inputtip = $(this).parent().siblings('.input-tip');
		$placeholder = $(this).attr('placeholder');

		if($(this).attr('placeholder') == $placeholder) {
			$(this).attr('placeholder', '');
			$inputtip.show();
			bstop = false;
		}
		if($(this).val() == '') {
			$inputtip.show();
			bstop = false;
		}
		if($(this).val() != '' && 'bstop==true') {
			$inputtip.hide();
			bstop == true
		}
		return false;
	});
	$obj.on('blur', function() {
		var accountreg1 = /^[\u4e00-\u9fa5a-zA-Z0-9\-\_]{4,20}$/g;
		var accountreg2 = /[\D]+/g;
		var accountreg3 = /^[0-9]*$/g;
		var phonereg = /^[1][345789][0-9]{9}$/g;
		var $inputtip = $(this).parent().siblings('.input-tip');
		var $tipspan = $inputtip.children('span');
		var $iStatus = $(this).siblings('.i-status');
		var username = $(this).val();

		if($(this).attr('id') == $('#form-account').attr('id')) {
			if($(this).val() == '') {
				$(this).attr('placeholder', '您的账户名和登录名')
				$inputtip.hide();
				bstop = false;
			} else if(accountreg3.test($(this).val())) {
				$inputtip.show();
				$tipspan.html('用户名不能是纯数字，请重新输入！');
				$tipspan.css('color', '#e22');
				bstop = false;
			} else if(($(this).val().length < 4) || ($(this).val().length > 20)) {
				$inputtip.show();
				$tipspan.html('长度只能在4-20个字符之间');
				$tipspan.css('color', '#e22');
				bstop = false;
			} else if((accountreg1.test($(this).val())) && (accountreg2.test($(this).val()))) {
				$inputtip.hide();
				$tipspan.html('支持中文、字母、数字、“-”“_”的组合，4-20个字符');
				$tipspan.css('color', '#ccc');
				bstop = true;
			}
		}

		if($(this).attr('id') == $('#form-phone').attr('id')) {
			if($(this).val() == '') {
				$(this).attr('placeholder', '建议使用常用手机')
				$inputtip.hide();
				bstop = false;
			} else if(phonereg.test($(this).val())) {
				$inputtip.hide();
				$tipspan.html('建议使用常用手机');
				$tipspan.css('color', '#ccc');
				bstop = true;
			} else {
				$inputtip.show();
				$tipspan.html('格式有误');
				$tipspan.css('color', '#e22');
				bstop = false;
			}
		}
		if($(this).attr('id') == $('#form-pwd').attr('id')) {
			if($(this).val() == '') {
				$(this).attr('placeholder', '建议至少使用两种字符组合')
				$inputtip.hide();
				bstop = false;
			} else if(($(this).val().length < 6) || ($(this).val().length > 20)) {
				$inputtip.show();
				$tipspan.html('长度只能在6-20个字符之间');
				$tipspan.css('color', '#e22');
				bstop = false;
			} else if(($(this).val().length >= 6) && ($(this).val().length <= 20)) {
				bstop = true;
				$inputtip.hide();
				$tipspan.html('建议使用字母、数字和符号两种及以上的组合，6-20个字符');
				$tipspan.css('color', '#ccc');
			}
		}
		if($(this).attr('id') == $('#form-pwdrepeat').attr('id')) {
			if($(this).val() == '') {
				$(this).attr('placeholder', '请再次输入密码')
				$inputtip.hide();
				bstop = false;
			} else if($(this).val() != ($(this).parents('.line').siblings('.line').find('#form-pwd').val())) {
				$inputtip.show();
				$tipspan.html('两次密码输入不一致');
				$tipspan.css('color', '#e22');
				bstop = false;
			} else {
				$inputtip.hide();
				bstop = true;
			}
		}
		if(bstop) {
			$iStatus.css('display', 'block');
		} else {
			$iStatus.css('display', 'none');
		}
	});
	$obj.on('input', function() {
		var $inputtip = $(this).parent().siblings('.input-tip');
		var $tipspan = $inputtip.children('span');
		var $iStatus = $(this).siblings('.i-status');
		if($(this).attr('id') == $('#form-account').attr('id')) {
			$inputtip.show();
			$tipspan.html('支持中文、字母、数字、“-”“_”的组合，4-20个字符');
			$tipspan.css('color', '#ccc');
		}
		if($(this).attr('id') == $('#form-phone').attr('id')) {
			$inputtip.show();
			$tipspan.html('建议使用常用手机');
			$tipspan.css('color', '#ccc');
		}
		if($(this).attr('id') == $('#form-pwdrepeat').attr('id')) {
			$inputtip.hide();
		}
		if($(this).attr('id') == $('#form-pwd').attr('id')) {
			if(($(this).val().length >= 6) && ($(this).val().length <= 20)) {
				bstop = true;
				var numreg = /\d/;
				var uppreg = /[a-zA-Z]/;
				var otherreg = /\W/;
				var count = 0;
				if(numreg.test($(this).val())) {
					count++;
				}
				if(uppreg.test($(this).val())) {
					count++;
				}
				if(otherreg.test($(this).val())) {
					count++;
				}
				switch(count) {
					case 1:
						$tipspan.html('有被盗风险,建议使用字母、数字和符号两种及以上组合');
						$tipspan.css('color', '#ccc');
						break;
					case 2:
						$tipspan.html('安全强度适中，可以使用三种以上的组合来提高安全强度');
						$tipspan.css('color', '#ccc');
						break;
					case 3:
						$tipspan.html('你的密码很安全');
						$tipspan.css('color', '#ccc');
						break;
				}
			}
		}
		if(bstop) {
			$iStatus.css('display', 'block');
			$inputtip.show();
		} else {
			$iStatus.css('display', 'none');
		}
	});

	var bstop1 = false; //不通过
	$('#form-account').on('blur', function() {
		var username = $(this).val();
		if(username != '') {
			$.ajax({
				type: 'post',
				url: '../JD20171206/php/register.php',
//				url: '../php/register.php',
				data: {
					name: username,
					pass:$('#password').val()
				},
				success: function(data) {
					alert(data);
					if(!data) {
						$('#form-account').siblings('.i-status').show();
						bstop1 = true;
					} else {
						$('#form-account').parent().siblings('.input-tip').children('span').html('该用户名已被使用，请更换其它用户名');
						$('#form-account').parent().siblings('.input-tip').show();
						$('#form-account').siblings('.i-status').hide();
						bstop1 = false;
					}
					
				}
			})
		}
	});
	
	$('form').on('submit', function() {
		if(bstop&&bstop1) {
			alert('ok');
			$(window).attr('location', 'https://www.jd.com/');
		} else {
			alert('输入的信息不符合要求，请核对，谢谢！');
		}
	});
}
judeInput('.field');
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
	var $phonecode = $('#phonecode');
	$phone.on('click', function() {
		$phonecode.val(randomCode());
	});
}
phoneCode();

function aboutDialog() { //点击取消和右上角关闭按钮，遮罩和条款框消失，跳转到京东主页。点击同意，遮罩和条款框消失。
	var $yes = $('.protocol-button button');
	var $zhezhao = $('.zhezhao');
	var $dialog = $('.ui-dialog');
	var $close = $('.ui-dialog-close');
	$yes.on('click', function() {
		$zhezhao.hide();
		$dialog.hide();
	});
	$close.on('click', function() {
		$zhezhao.hide();
		$dialog.hide();
		window.location.href = 'https://www.jd.com/';
	});
}
aboutDialog();
//表单验证-用户名
/*(function() {
	var bstop = false; //不通过
	$('#form-account').on('blur', function() {
		var username = $(this).val();
		if(username != '') {
			$.ajax({
				type: 'post',
				url: '../JD20171206/php/reg.php',
				data: {
					name: username
				},
				success: function(data) {
					if(!data) {
						console.log('no');
						$('#form-account').siblings('.i-status').show();
						bstop = true;
					} else {
						console.log('yes');
						$('#form-account').parent().siblings('.input-tip').children('span').html('该用户名已被使用，请更换其它用户名');
						$('#form-account').parent().siblings('.input-tip').show();
						$('#form-account').siblings('.i-status').hide();
						bstop = false;
					}
				}
			})
		}
	});
	$('form').on('submit', function() {
		if(bstop) {
			return false; //阻止按钮跳转。
		}
	});
})();*/