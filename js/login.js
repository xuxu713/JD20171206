function appearUnderline(obj) {
	var $a = $().find('a');
	$a.hover(function() {
		$a.css('text-decoration', 'underline');
	}, function() {
		$a.css('text-decoration', 'none');
	});
}
appearUnderline('.regist-link');
appearUnderline('.item-fore3');
tabswitch(); //点击login.html>main>login-tab，显示隐藏对应的qrcode-login和username-login

function tabswitch() { //点击元素，显示指定的元素
	var $qrcodeLogin = $('.qrcode-login');
	var $usernameLogin = $('.username-login');
	var $codeLogin = $('.codelogin');
	var $nameLogin = $('.namelogin');
	$codeLogin.on('click', function() {
		$qrcodeLogin.css('display', 'block');
		$codeLogin.css({
			'color': '#e4393c',
			'font-weight': '700'
		});
		$usernameLogin.css('display', 'none');
		$nameLogin.css({
			'color': '#999',
			'font-weight': 'normal'
		});
	});
	$nameLogin.on('click', function() {
		$usernameLogin.css('display', 'block');
		$nameLogin.css({
			'color': '#e4393c',
			'font-weight': '700'
		});
		$qrcodeLogin.css('display', 'none');
		$codeLogin.css({
			'color': '#999',
			'font-weight': 'normal'
		});
	})
}
hoverColorStay(); //划过login.htm>-main>login-tab，a字体变色，滑出时判断是否需要更改a字体颜色
function hoverColorStay() { //划过盒子，指定子元素变色，滑出时判断当前显示的盒子，来决定指定元素的样式
	var $ele = $('.login-tab').find('a');
	$ele.hover(function() {
		$(this).css('color', '#e4393c');
		$(this).css('font-weight', '700')
	}, function() {
		if($('.qrcode-login').css('display') == 'block') {
			$('.codelogin').css({
				'color': '#e4393c',
				'font-weight': '700'
			});
			$('.namelogin').css({
				'color': '#999',
				'font-weight': 'normal'
			});
		} else if($('.username-login').css('display') == 'block') {
			$('.namelogin').css({
				'color': '#e4393c',
				'font-weight': '700'
			});
			$('.codelogin').css({
				'color': '#999',
				'font-weight': 'normal'
			});
		} else {
			$(this).css('color', '#999');
			$(this).css('font-weight', 'normal')
		}
	})
}

function showQrcodeHelpImg() { //手机扫码登录，滑出帮助图片
	var $qrcodeHelp = $('.qrcode-help');
	var $qrcode = $('.qrcode1');
	var $qrcodeText = $('.qrcode-text');
	$qrcode.hover(function() {
		$qrcode.stop().animate({
				'left': -65
			}, 300),
			$qrcodeHelp.delay(100).stop().fadeIn(300);
			return false;
	}, function() {
		$qrcode.delay(100).stop().animate({
				'left': 0
			}, 300),
			$qrcodeHelp.stop().fadeOut(300);
			return false;
	});
}
showQrcodeHelpImg();

function refresh() { //每次刷新，延时1s后遮罩出现，点击刷新按钮遮罩消失，刷新按钮消失。
	var $refrshButton = $('.qrcode-text a');
	var timer = setTimeout(function() {
		$('.zhezhao').css('visibility','visible');
		$refrshButton.css('visibility','visible');
	}, 1000);
	$refrshButton.on('click', function() {
		clearTimeout(timer);
		$('.zhezhao').hide();
		$refrshButton.hide();
		timer = setTimeout(function() {
			$('.zhezhao').show();
			$refrshButton.show();
		}, 1000);
	});
}
refresh();