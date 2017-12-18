define(['jquery', 'jquerycookie'], function($) { //前面的数组可以省略，没有依赖模块时可以省略。
	return {
		magnifier: (function() {
			var $spic = $('#spic');
			var $sf = $('#sf');
			var $bf = $('#bf');
			var $bpic = $('#bpic');
			var $left = $('#left');
			var $right = $('#right');
			var $num = 6;
			var $list = $('#list li');
			var $ul = $('#list ul');
			$spic.hover(function(ev) {
				$sf.show();
				$bf.show();
				$bpic.show();
				$sf.width($bf.width() * $spic.width() / $bpic.width());
				$sf.height($bf.height() * $spic.height() / $bpic.height());
				$(document).on('mousemove', function(ev) {
					var ev=ev||window.event;
					var $l = ev.clientX - $spic.offset().left - ($sf.width() / 2);
					var $t = ev.clientY - $spic.offset().top - ($sf.height() / 2);
					var $scale = $bpic.width() / $spic.width();
					if($l <= 0) {
						$l = 0;
					}
					if($l >= $spic.width() - $sf.width()) {
						$l = $spic.width() - $sf.width();
					}
					if($t <= 0) {
						$t = 0;
					}
					if($t >= $spic.height() - $sf.height()) {
						$t = $spic.height() - $sf.height();
					}
					$sf.css({
						left: $l,
						top: $t
					});
					$bpic.css({
						left: -$scale * $l,
						top: -$scale * $t
					})
					return false;
				});
			}, function() {
				$sf.hide();
				$bf.hide();
				$bpic.hide();
			});
			if($num >= $list.length) {
				$right.css({
					color: '#fff'
				})
			}
			$right.on('click', function() {
				if($num < $list.length) {
					$num++;
					if($num == $list.length) {
						$right.css({
							color: '#fff'
						});
					}
					$left.css({
						color: '#333'
					})
				}
				$ul.animate({
					left: -$list.innerWidth() * ($num - 6)
				}, 100);
			});
			$left.on('click', function() {
				if($num > 6) {
					$num--;
					if($num == 6) {
						$left.css({
							color: '#fff'
						});
					}
					$right.css({
						color: '#333'
					});
				}
				$ul.animate({
					left: -$list.innerWidth() * ($num - 6)
				}, 100)
			});
			$list.on('click', function() {
				var $src = $(this).children('img').attr('src');
				$('#spic img').attr('src', $src);
				$('#bpic').attr('src', $src);
			});
		})()
	}
})