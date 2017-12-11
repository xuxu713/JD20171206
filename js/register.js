showUser();

function showUser() { //显示和隐藏注册用户名的相关提示信息
	var $accountA = $('.have-account a');
	$accountA.hover(function() {
		$(this).css('text-decoration', 'underline');
	}, function() {
		$(this).css('text-decoration', 'none');
	});
}

function judeInput(obj) { //判断输入框是否输入，输入的合法性。
	var bstop = false;
	var $obj = $(obj);
	var $placeholder = null;
	$obj.on('focus', function() {
		$placeholder = $(this).attr('placeholder');
		if($(this).attr('placeholder') == $placeholder) {
			$(this).attr('placeholder', '');
			$(this).parent().siblings('.input-tip').show();
			bstop = false;
		}
		if($(this).val()==''){
			$(this).parent().siblings('.input-tip').show();
			bstop = false;
		}
	});
	$obj.on('blur', function() {
		var accountreg1 = /^[\u4e00-\u9fa5a-zA-Z0-9\-\_]{4,20}$/g;
		var accountreg2 = /[\D]+/g;
		var phonereg=/^[1][345789][0-9]{9}$/g;
		var $iStatus = $(this).siblings('.i-status');
		if($(this).attr('placeholder') == '') {
			$(this).attr('placeholder', $placeholder)
			$(this).parent().siblings('.input-tip').hide();
			bstop = false;
		}
		if($(this).attr('id') == $('#form-account').attr('id')) {
			if((accountreg1.test($(this).val())) && (accountreg2.test($(this).val()))) {
				$iStatus.css('display', 'block');
				$(this).parent().siblings('.input-tip').hide();
				$(this).parent().siblings('.input-tip').hide().children('span').html('支持中文、字母、数字、“-”“_”的组合，4-20个字符');
				bstop = true;
			} else if($(this).val()!=''){
				$iStatus.css('display', 'none');
				$(this).parent().siblings('.input-tip').show().children('span').html('用户名格式不正确');
				bstop = false;
			}
		}
		if($(this).attr('id') == $('#form-phone').attr('id')) {
			if(phonereg.test($(this).val())) {
				$iStatus.css('display', 'block');
				$(this).parent().siblings('.input-tip').hide();
				$(this).parent().siblings('.input-tip').hide().children('span').html('建议使用常用手机');
				bstop = true;
			} else {
				$iStatus.css('display', 'none');
				$(this).parent().siblings('.input-tip').show().children('span').html('格式有误');
				bstop = false;
			}
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