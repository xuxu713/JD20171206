/*function phpMysql(obj, ele) {
	$.post('php/test.php', {
		obj: obj,
		ele: ele
	}, function(data) {
		console.log(data);
		var arr = JSON.parse(data);
		var html = '';
		for(var i = 0; i < arr.length; i++) {
			html += '<li><a href="#">' + arr[i] + '</a></li>';
		}
		$(obj).html(html);
		hoverColor('.submyjd', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色。
		hoverColor('.subservice', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色
		hoverColor('.spesubweb', 'a'); //index.html>shortcut>nav-li>二级菜单，a字体变色
		hoverColor('.subdrop', 'a');
	})
}*/
//phpMysql('.submyjd .list-top', 'a');
//phpMysql('.submyjd .list-bottom', 'a');
//phpMysql('.subdrop .subdropol', 'a');

function banner(box) { //轮播图效果
	var $box = $(box);
	var $imgs = $(box).find('ul li');
	var $btns = $(box).find('ol li');
	var timer = null;
	var $index = 0;

	if($('.left')) {
		var $left = $('.left');
	}
	if($('.right')) {
		var $right = $('.right');
	} else {
		var $left = null;
		var $right = null;
	}

	$btns.on('mouseover', function() {
		$index = $(this).index();
		tabSwitch();
	});

	function tabSwitch() {
		$btns.eq($index).addClass('active').siblings($btns).removeClass('active');
		$imgs.eq($index).siblings().fadeOut();
		$imgs.eq($index).fadeIn();
	}

	$box.hover(function() {
		clearInterval(timer);
		$left.show();
		$right.show();
	}, function() {
		timer = setInterval(rightClick, 2000);
		$left.hide();
		$right.hide();
	});

	function rightClick() {
		$index < ($btns.length - 1) ? $index++ : $index = 0;
		tabSwitch();
	}
	$right.on('click', rightClick);
	$left.on('click', function() {
		$index > 0 ? $index-- : $index = ($btns.length - 1);
		tabSwitch();
	});
	timer = setInterval(rightClick, 2000);
}

banner('.slider');
banner('.sk-special'); //index.html>seckill(京东秒杀模块)最右侧轮播效果
function tab(obj, ele1 = 'ul li', ele2 = 'ol li', event = 'mouseover') { //tab选项卡效果
	$obj = $(obj);
	$ele1 = $(obj).find(ele1);
	$ele2 = $(obj).find(ele2);
	$index = 0;
	$ele2.on(event, function() {
		$index = $(this).index();
		$ele1.eq($index).siblings(ele1).css('display', 'none');
		$ele1.eq($index).css('display', 'block');
	});
}
tab('.news', '.newstab', '.newsli');
$(window).scroll(function() { //实现顶部悬浮搜索框，index.html滚轮下拉距离大于800时出现。
	var $scrolltop = $(document).scrollTop();
	var $fixhead = $('#fixhead');
	if($scrolltop >= 200) {
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
stayleave('.myjdli', '.submyjd'); //停留父级li，二级菜单一直显示
hoversub('.serviceli', '.subservice', 'myser'); //二级菜单的显示和隐藏
stayleave('.serviceli', '.subservice'); //停留父级li，二级菜单一直显示
hoversub('.webli', '.spesubweb', 'myweb'); //二级菜单的显示和隐藏
stayleave('.webli', '.spesubweb'); //停留父级li，二级菜单一直显示
hoversub('.dropparent', '.subdrop', 'null', ); //二级菜单的显示和隐藏
stayleave('.dropparent', '.subdrop'); //停留父级li，二级菜单一直显示
function hoverColor(obj, ele, colorafter = '#c81623', colorbefore = '#999', weight = 'normal', attr = 'color') { //划过盒子，指定子元素变色
	var $ele = $(obj).find(ele);
	$ele.hover(function() {
		$(this).css(attr, colorafter);
		$(this).css('font-weight', weight)
	}, function() {
		$(this).css(attr, colorbefore);
		$(this).css('font-weight', 'normal')
	})
}
hoverColor('.nav-li', 'a'); //index.html>shortcut>nav-li，a字体变色。
hoverColor('#hotwords', 'a'); //index.html>header>hotwords，a字体变色
hoverColor('.footer', 'a'); //划过所有.footer，a字体变色
hoverColor('.ask', 'a'); //划过login.html-header-login-ask，a字体变色#e4393c
hoverColor('.news-head', '.news-more', '#c81623', '#666');
hoverColor('.cate_menu', '.cate_menu_item', '#999395', '#6e6568', 'normal', 'background-color');
hoverColor('.cate_menu', '.cate_menu_lk', '#c81623', '#fff');
hoverColor('.user-info-show', 'a', '#db192b', '#666');
hoverColor('#shortcut', '.style-red', '#db192b', '#f10215'); //顶部shortcut里class设置为style-red的标签，鼠标划出后颜色为原设置红色

function hoverChangeBgPosition(ele, attr, aftervalue, beforevalue) { //划过div，改变背景图片位置来改变显示
	$(ele).hover(function() {
		$(this).css(attr, aftervalue);
	}, function() {
		$(this).css(attr, beforevalue);
	})
}
hoverChangeBgPosition('.photo', 'background-position', '-30px 0', '0 0');

function lineChangePosition() { //.line根据tab选项卡的改变定位left值
	$('.newsli').on('mouseover', function() {
		if($('.broadcast-content').css('display') == 'block') {
			$('.line').stop().animate({
				'left': '38px'
			}, 200);
		} else {
			$('.line').stop().animate({
				'left': '-2px'
			}, 200);
		}
	});

}
lineChangePosition();

function step() {
	$(window).on('scroll', function() { //滚动条距离控制楼梯的显示隐藏
		var $top = $(this).scrollTop();
		var $maxheight = $('#headerlt').height() / 2; //设置楼梯出现的参考值
		if($top >= ($maxheight + 100)) {
			$('#loutinav').show();
		} else {
			$('#loutinav').hide();
		}

		$('.louti').each(function() { //拖动滚轮对应的楼梯添加active类
			var $current = $('.louti').eq($(this).index('.louti'));
			var $loutitop = $current.offset().top + $current.height() / 2; //得到当前滚轮的距离+当前div的高度/2
			if($loutitop > $top) {
				$('#loutinav li').removeClass('active');
				$('#loutinav li').eq($(this).index()).addClass('active');
				return false;
			}
		});
	});
	$('#loutinav li').not('.last').on('click', function() { //点击当前楼梯按钮，给楼梯移除和添加active。通过index的一致，控制滚轮距离跳转到具体的div
		$(this).addClass('active').siblings('li').removeClass('active');
		var $offsettop = $('.louti').eq($(this).index('li')).offset().top;
		$('html,body').animate({
			scrollTop: $offsettop
		});
	});
	$('#loutinav li').not('.last').hover(function() { //滑过楼梯添加active类，滑出取消。(冲突-拖动滚轮对应的楼梯添加active类，未调好)
		$(this).addClass('active');
	}, function() {
		$(this).removeClass('active');
		var $offsettop = $('.louti').eq($(this).index('li')).offset().top;
		console.log($offsettop);
		console.log($(window).scrollTop());
		if($offsettop == $(window).scrollTop()) {
			$('#loutinav li').eq($(this).index('li')).addClass('active');
		}
	});
	$('.last').on('click', function() { //回到顶部
		$('html,body').animate({
			scrollTop: 0
		});
	});
};
step();

function shangcheng() { //商城效果，左右移动来更换图片
	var $box = $('.box_bd .sk-list');
	var $imgs = $(box).find('.sk-item');
	var $liLength = $imgs.width();
	var $btns = $(box).find('ol li');
	var $left = $(box).find('.sk_controls_prev');
	var $right = $(box).find('.sk_controls_next');

	var timer = null;
	var $index = 0;

	$btns.on('mouseover', function() {
		$index = $(this).index();
		tabSwitch();
	});

	function tabSwitch() {
		$btns.eq($index).addClass('active').siblings($btns).removeClass('active');
		$imgs.eq($index).siblings().fadeOut();
		$imgs.eq($index).fadeIn();
	}

	$box.hover(function() {
		clearInterval(timer);
		$left.show();
		$right.show();
	}, function() {
		timer = setInterval(rightClick, 2000);
		$left.hide();
		$right.hide();
	});

	function rightClick() {
		$index < ($btns.length - 1) ? $index++ : $index = 0;
		tabSwitch();
	}
	$right.on('click', rightClick);
	$left.on('click', function() {
		$index > 0 ? $index-- : $index = ($btns.length - 1);
		tabSwitch();
	});
	timer = setInterval(rightClick, 2000);
}