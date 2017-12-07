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
function SecKill(box) {
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
new SecKill('.sk-special');