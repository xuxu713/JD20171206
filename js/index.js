function banner(box) {
	$box = $(box);
	$imgs = $(box).find('ul').children('li');
	$btns = $(box).find('ol').children('li');
	timer = null;
	$index = 0;
	$btns.on('mouseover', function() {
		$index = $(this).index();
		tabSwitch();
	});

	function tabSwitch() { //轮播图效果
		$btns.eq($index).addClass('active').siblings($btns).removeClass('active');
		$imgs.eq($index).siblings().fadeOut();
		$imgs.eq($index).fadeIn();
	}

	$box.hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(rightClick, 2000);
	});

	function rightClick() {
		$index < ($btns.length - 1) ? $index++ : $index = 0;
		tabSwitch();
	}
	timer = setInterval(rightClick, 2000);
}
//banner('.sk-special'); //index.html>seckill(京东秒杀模块)最右侧轮播效果
function tab(box) { //tab选项卡效果
	$box = $(box);
	$imgs = $(box).find('ul').children('li');
	$btns = $(box).find('ol').children('li');
	$index = 0;
	$btns.on('mouseover', function() {
		$index = $(this).index();
		tabSwitch();
	});

	function tabSwitch() {
		$btns.eq($index).addClass('active').siblings($btns).removeClass('active');
		$imgs.eq($index).siblings().hide();
		$imgs.eq($index).show();
	}
}
$(window).scroll(function() { //实现顶部悬浮搜索框，index.html滚轮下拉距离大于800时出现。
	var $scrolltop = $(document).scrollTop();
	var $fixhead = $('#fixhead');
	if($scrolltop >= 800) {
		$fixhead.show();
		$fixhead.stop().animate({
			height: '48px'
		}, 200);
	} else {
		$fixhead.height('0');
		$fixhead.hide();

	}
});

function hoversub(li, sub, a) { //二级菜单的显示与隐藏，父级li的颜色改变，对应超链接颜色改变
	var $li = $(li);
	var $sub = $(sub);
	var $a = $(a);
	$li.hover(function() {
		$li.css({
			'background': 'white',
		});
		$a.css({
			'color': '#c81623'
		})
		$sub.show();
	}, function() {
		$li.css({
			'background': '#e3e4e5',
		});
		$a.css({
			'color': '#999'
		})
		$sub.hide();
	})
}

function stayleave(obj, subobj) { //鼠标停留父元素li，子元素二级菜单一直显示
	var $obj = $(obj);
	var $subobj = $(subobj);
	$obj.hover(function() {
		$obj.stop().show();
	}, function() {
		$subobj.stop().hide();
	})
}
hoversub('.myjdli', '.submyjd', '.myjd'); //二级菜单的显示和隐藏
hoversub('.serviceli', '.subservice', 'myser'); //二级菜单的显示和隐藏
hoversub('.webli', '.spesubweb', 'myweb'); //二级菜单的显示和隐藏
stayleave('.myjdli', '.submyjd'); //停留父级li，二级菜单一直显示
stayleave('.serviceli', '.subservice'); //停留父级li，二级菜单一直显示
stayleave('.webli', '.spesubweb'); //停留父级li，二级菜单一直显示
function hoverColor(obj, ele, colorafter = '#c81623', colorbefore = '#999', weight = 'normal') { //划过盒子，指定子元素变色
	var $ele = $(obj).find(ele);
	$ele.hover(function() {
		$(this).css('color', colorafter);
		$(this).css('font-weight', weight)
	}, function() {
		$(this).css('color', colorbefore);
		$(this).css('font-weight', 'normal')
	})
}
hoverColor('.submyjd', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色。
hoverColor('.subservice', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色
hoverColor('.spesubweb', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色
hoverColor('.nav-li', 'a'); //index.html>shortcut>nav-li，a字体变色。
hoverColor('#hotwords', 'a'); //index.html>header>hotwords，a字体变色
hoverColor('.footer', 'a'); //划过所有.footer，a字体变色
hoverColor('.ask', 'a'); //划过login.html-header-login-ask，a字体变色#e4393c

$.post('php/test.php', {
	obj: '.submyjd .list-top',
	ele: 'a'
}, function(data) {
	var arr = JSON.parse(data);
	var $a = $('.submyjd .list-top').find('a');
	$.each($a, function(i) {
		$(this).html(arr[i]);
	});
})