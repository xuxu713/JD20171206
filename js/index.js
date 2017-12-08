/*function SecKill() {
	$skbox = $('.sk-special');
	$skimgs = $('.sk-special ul li');
	$skbtns = $('.sk-special ol li');
	sktimer = null;
	$index = 0;
	$skbtns.on('mouseover', function() {
		$index = $(this).index();
		tabSwitch();
	});

	function tabSwitch() {
		$skbtns.eq($index).addClass('active').siblings($skbtns).removeClass('active');
		$skimgs.eq($index).siblings().fadeOut();
		$skimgs.eq($index).fadeIn();
	}

	$skbox.hover(function() {
		clearInterval(sktimer);
	}, function() {
		sktimer = setInterval(rightClick, 2000);
	});

	function rightClick() {
		$index < ($skbtns.length - 1) ? $index++ : $index = 0;
		tabSwitch();
	}
	sktimer = setInterval(rightClick, 2000);
}
new SecKill();*/
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

	function tabSwitch() {
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
banner('.sk-special'); //京东秒杀模块，最右侧轮播效果

//实现顶部悬浮搜索框
$(window).scroll(function() {
	var $scrolltop = $(document).scrollTop();
	var $fixhead = $('#fixhead');
	if($scrolltop >= 300) {
		$fixhead.show();
		$fixhead.stop().animate({
			height: '48px'
		}, 200);
	} else {
		$fixhead.height('0');
		$fixhead.hide();

	}
});

function myjd() {
	var $myjd = $('.myjd');
	var $myjdli = $('.myjdli');
	var $submyjd = $('.submyjd');
	$myjdli.hover(function() {
		$myjdli.css({
			'background': 'white',
		});
		$myjd.css({
			'color': '#c81623'
		})
		$submyjd.stop().delay(100).show();
	}, function() {
			$myjdli.css({
				'background': '#e3e4e5',
			});
			$myjd.css({
				'color': '#999'
			})
			$submyjd.stop().delay(500).hide();
	})
}
myjd();

/*function stayleave() {
	var $myjdli = $('.myjdli');
	var $submyjd = $('.submyjd');
	$myjdli.hover(function() {
		$myjdli.stop().show();
	}, function() {
		$submyjd.stop().hide();
	})
}*/
function stayleave(obj='.myjdli',subobj='.submyjd') {
	var $obj= $(obj);
	var $subobj = $(subobj);
	$obj.hover(function() {
		$obj.stop().show();
	}, function() {
		$subobj.stop().hide();
	})
}
stayleave('.myjdli','.submyjd');
stayleave('.serviceli','.subservice');
function hoverColor(obj='.submyjd',ele='a',colorafter='#c81623',colorbefore='#999'){
	var $ele=$(obj).find(ele);
	$ele.hover(function(){
		$(this).css('color',colorafter)
	},function(){
		$(this).css('color',colorbefore);
	})
}
hoverColor();
