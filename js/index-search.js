var $oInput = $('.text');
var $oUl = $('.text-ul');
var $temp = '';

function taobao(data) {
	var arr = data.result;
	var html = '';
	if($oInput.val() != '') {
		if(arr.length < 4) {
			for(var i = 0; i < arr.length; i++) {
				html += '<li>' + arr[i] + '</li>';
			}
		} else {
			for(var i = 0; i < 4; i++) {
				html += '<li>' + arr[i] + '</li>';
			}
		}
		$oUl.html(html);
	} else {
		$oUl.html('');
	}
	var $aLi = $('li');
	$aLi.on('click', function() {
		$oInput.val($(this).html());
		$oUl.css('display', 'none');
	})
	$aLi.hover(function() {
		$temp = $(this).html();
	}, function() {
		$temp = '';
	})
}
$oInput.on('input', function() {
	if($oInput.val() == '') {
		$oUl.css('display', 'none');
	} else {
		$oUl.css('display', 'block');
	}
	var $script = $("<script src='https://suggest.taobao.com/sug?code=utf-8&q=" + $oInput.val() + "&_ksTS=1511263761406_471&callback=taobao&k=1&area=c2c&bucketid=10'><\/script>")
	$('body').append($script);
})
$oInput.on('blur', function() {
	if($temp != '') {
		$oInput.val($temp);
	}
	$oUl.css('display', 'none');
})
$oInput.on('focus', function() {
	if($oInput.val() == '') {
		$oUl.css('display', 'none');
	} else {
		$oUl.css('display', 'block');
	}
});

