//1.添加购物车商品的数据
$.ajax({
	url: 'php/cart.json',
	dataType: 'json'
}).done(function(data) {
	var $html = '';
	for(var i = 0; i < data.length; i++) {
		$html += '<li>' +
			'<div class="goodsinfo">' +
			'<div class="p-img">' +
			'<a href="##"><img class="loadimg" src="' + data[i].img + '" alt="" sid="' + data[i].sid + '" /></a>' +
			'</div>' +
			'<div class="p-name">' +
			'<a class="loadt" href="##">' + data[i].title + '</a>' +
			'</div>' +
			'<div class="p-price"><strong><em>￥</em><i class="loadpcp">' + data[i].price + '</i></strong></div>' +
			'<div class="p-btn"><a href="javascript:void(0)"><b></b>加入购物车</a></div>' +
			'</div>' +
			'</li>';
	}
	$('.goods-list ul').html($html);

	if(getCookie('cartsid') && getCookie('cartnum')) {
		var s = getCookie('cartsid').split(',');
		var n = getCookie('cartnum').split(',');
		for(var i = 0; i < s.length; i++) {
			createcart(s[i], n[i]);
		}
	}
});
var arrsid = [];
var arrnum = [];

function cookieToArray() {
	if(getCookie('cartsid')) {
		arrsid = getCookie('cartsid').split(',');
	} else {
		arrsid = [];
	}

	if(getCookie('cartnum')) {
		arrnum = getCookie('cartnum').split(',');
	} else {
		arrnum = [];
	}
}

$('.goods-list ul').on('click', '.p-btn a', function() {
	var sid = $(this).parents('.goodsinfo').find('.loadimg').attr('sid');
	cookieToArray();
	if($.inArray(sid, arrsid) != -1) {
		$('.goods-item:visible').each(function() {
			if(sid == $(this).find('img').attr('sid')) {
				var $num = $(this).find('.quantity-form input').val();
				$num++;
				$(this).find('.quantity-form input').val($num);
				var $dj = parseFloat($(this).find('.b-price strong').html());
				$(this).find('.b-sum strong').html(($dj * $num).toFixed(2));
				arrnum[$.inArray(sid, arrsid)] = $num;
				addCookie('cartnum', arrnum.toString(), 7);
				totalprice();
			}
		});
	} else {
		arrsid.push(sid);
		addCookie('cartsid', arrsid.toString(), 7);
		arrnum.push(1);
		addCookie('cartnum', arrnum.toString(), 7);
		createcart(sid, 1);
	}
});

function createcart(sid, num) {
	$.ajax({
		url: 'php/cart.json',
		dataType: 'json'
	}).done(function(data) {
		for(var i = 0; i < data.length; i++) {
			if(sid == data[i].sid) {
				var $clone = $('.goods-item:hidden').clone(true);
				$clone.find('.goods-pic').find('img').attr('src', data[i].img);
				$clone.find('.goods-pic').find('img').attr('sid', data[i].sid);
				$clone.find('.goods-d-info').find('a').html(data[i].title);
				$clone.find('.b-price').find('strong').html(data[i].price);
				$clone.find('.quantity-form').find('input').val(num);
				var $dj1 = parseFloat($clone.find('.b-price strong').html());
				$clone.find('.b-sum strong').html(($dj1 * num).toFixed(2));
				$clone.css('display', 'block');
				$('.item-list').append($clone);
				kong();
				totalprice();
			}
		}
	});
}

kong()

function kong() {
	if(getCookie('cartsid')) {
		$('.cart-empty').hide();
	} else {
		$('.cart-empty').show();
	}
}

totalprice();

function totalprice() {
	var total = 0;
	var countnum = 0;
	$('.goods-item:visible').each(function() {
		if($(this).find('input:checkbox').is(':checked')) {
			total += parseFloat($(this).find('.b-sum strong').html());
			countnum += parseInt($(this).find('.quantity-form').find('input').val());
		}
	});
	$('.totalprice').html('￥' + total.toFixed(2));
	$('.amount-sum em').html(countnum);
}

$('.allsel').on('change', function() {
	$('.goods-item:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
	$('.allsel').prop('checked', $(this).prop('checked'));
	totalprice();
});

var $inputchecked = $('.goods-item:visible').find('input:checkbox');
$('.item-list').on('change', $inputchecked, function() {
	var $inputs = $('.goods-item:visible').find('input:checkbox');
	if($('.goods-item:visible').find('input:checked').length == $inputs.size()) {
		$('.allsel').prop('checked', true);
	} else {
		$('.allsel').prop('checked', false);
	}
	totalprice();
});

function delgoodslist(sid, arrsid) {
	var index = -1;
	for(var i = 0; i < arrsid.length; i++) {
		if(sid == arrsid[i]) {
			index = i;
		}
	}
	arrsid.splice(index, 1);
	arrnum.splice(index, 1);
	addCookie('cartsid', arrsid.toString(), 7);
	addCookie('cartnum', arrnum.toString(), 7);
}

$('.item-list').on('click', '.b-action a', function(ev) {
	cookieToArray();
	$(this).first().parents('.goods-info').remove();
	delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), arrsid);
	totalprice();
});

$('.operation a:first').on('click', function() {
	$('.goods-item:visible').each(function() {
		if($(this).find('input:checkbox').is(':checked')) {
			$(this).remove();
			delgoodslist($(this).find('img').attr('sid'), arrsid);
		}
	});
	totalprice();
});

$('.quantity-add').on('click', function() {
	var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
	$count++;
	if($count >= 99) {
		$count = 99;
	}
	$(this).parents('.goods-item').find('.quantity-form input').val($count);
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
	totalprice();
	setcookie($(this));

});

$('.quantity-down').on('click', function() {
	var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
	$count--;
	if($count <= 1) {
		$count = 1;
	}
	$(this).parents('.goods-item').find('.quantity-form input').val($count);
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
	totalprice();
	setcookie($(this));
});

$('.quantity-form input').on('input', function() {
	var $reg = /^\d+$/g;
	var $value = parseInt($(this).val());
	if($reg.test($value)) {
		if($value >= 99) {
			$(this).val(99);
		} else if($value <= 0) {
			$(this).val(1);
		} else {
			$(this).val($value);
		}
	} else {
		$(this).val(1);
	}
	$(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));
	totalprice();
	setcookie($(this));
});

function singlegoodsprice(row) {
	var $dj = parseFloat(row.parents('.goods-item').find('.b-price').find('strong').html());
	var $cnum = parseInt(row.parents('.goods-item').find('.quantity-form input').val());
	return($dj * $cnum).toFixed(2);
}

function setcookie(obj) {
	cookieToArray();
	var $index = obj.parents('.goods-item').find('img').attr('sid');
	arrnum[arrsid.indexOf($index)] = obj.parents('.goods-item').find('.quantity-form input').val();
	addCookie('cartnum', arrnum.toString(), 7);
}

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
hoverColor('*', 'a');
