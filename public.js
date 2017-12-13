/*
 tool:工具方法
 * 1.getStyle(obj,attr);  获取任意css属性值
 * 2.$(selector),通过id，className,element获取对应的元素对象
 * 
 * 
 * 
 * 
 * 
 * */

function $(selector){
	if(selector.substring(0,1)=='#'){
		return document.getElementById(selector.substring(1));
	}else if(selector.substring(0,1)=='.'){
		return document.getElementsByClassName(selector.substring(1));
	}else{
		if(document.getElementsByTagName(selector)[0]){
			return document.getElementsByTagName(selector);
		}else{
			throw new Error('This parameter is not element');
		}
	}
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}

function ranNum(min,max){
	return Math.floor(Math.random()*(max-min+1))+min
}

function ranBgcolor(){
	return '#'+parseInt(Math.random()*0xffffff).toString(16);
}


function getClass(classname,parent){
	var parent=parent||document;
	if(parent.getElementsByClassName){
		return parent.getElementsByClassName(classname);//标准支持的。
	}else{
		var arr=[];//定义一个空数组，用来存储满足条件的元素。
		var reg=new RegExp('\\b'+classname+'\\b');//定义正则验证
		var elements=parent.getElementsByTagName('*');//获取parent下面的所有的元素
		for(var i=0;i<elements.length;i++){
			if(reg.test(elements[i].className)){//每一个元素的类名和传入的类名进行比较
				arr.push(elements[i]);
			}
		}
		return arr;//返回数组，数组里面是满足条件的元素。
	}
}

//设置cookie,获取cookie,删除cookie
function setcookie(key,value,days){
	var d=new Date();
	d.setDate(d.getDate()+days);
	document.cookie=key+'='+encodeURI(value)+';expires='+d;
}


function getcookie(key){
	var arr=decodeURI(document.cookie).split('; ');
	for(var i=0;i<arr.length;i++){
		var newarr=arr[i].split('=');
		if(newarr[0]==key){
			return newarr[1];
		}
	}
}

function delcookie(key){
	setcookie(key,'',-1);
}


function buffermove(obj,json,fn){//fn:回调函数，前面的运动完成之后，才能执行。
	var speed=0;
	clearInterval(obj.timer);//将定时器当作每个元素对象下面的属性来操作。
	obj.timer=setInterval(function(){
		//获取当前的值。
		var bstop=true;
		for(var attr in json){//attr：传入的属性    json[attr]:属性的值
			var current=null;
			if(attr=='opacity'){
				current=Math.round(getStyle(obj,attr)*100);//扩大100倍
			}else{
				current=parseInt(getStyle(obj,attr));
			}
			speed=(json[attr]-current)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(current!=json[attr]){//还有没有到目标点。继续运动
				if(attr=='opacity'){
					obj.style.opacity=(current+speed)/100;   
					obj.style.filter='alpha(opacity='+(current+speed)+')';
				}else{
					obj.style[attr]=current+speed+'px';
				}
				bstop=false;
			}
		}
		if(bstop){//运动停止条件
			clearInterval(obj.timer);
			fn&&fn();//前面fn存在，执行。
		}
		
		
	},20);
}

//ajax的方法(回调函数)
function objchangestring(obj){
	var arr=[];
	for(var i in obj){
		arr.push(i+'='+obj[i]);
	}
	return arr.join('&');
}


function ajax(options){//options对象
	options.type=options.type||'get';//请求类型的默认值。
	if(options.async==false){
		options.async=false;
	}else{
		options.async=true;
	}
	
	options.data=options.data||'';//允许数据为空
	
	
	if(typeof options.data=='object' && typeof options.data.length!='number'){
		options.data=objchangestring(options.data);
	}else{
		if(typeof options.data=='string'){
			options.data=options.data;
		}else{
			throw new Error('数据格式错误，请输入对象');
		}
		
	}
	
	
	//获取ajax的对象xhr
	var ajax=null;
	try{
		ajax=new XMLHttpRequest();//标准
	}catch(e){
		ajax=new ActiveXObject('Microsoft.XMLHTTP');//IE6
	}
	
	//打开方式(打开方式、接口地址、是否异步)
	if(options.type=='get'&& options.data){
		options.url+='?'+options.data;
	}
	
	ajax.open(options.type,options.url,options.async);
	
	//发送数据
	if(options.type=='get'&& options.data){
		ajax.send();
	}else{
		ajax.setRequestHeader('content-type','application/x-www-form-urlencoded');
		ajax.send(options.data);
	}
	
	if(options.async==false){
		options.success&&options.success(ajax.responseText);
	}else{
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4){
				if(ajax.status==200){
					//ajax.responseText//当前获取接口里面的数据
					options.success&&options.success(ajax.responseText);
				}else{
					options.error&&options.error(ajax.status);
				}
			}
		}
	}
	
}
