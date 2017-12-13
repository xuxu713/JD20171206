<?php
require "conn.php";
$username = $_REQUEST["name"] or die("用户名是必须的");
$password = $_REQUEST["pass"] or die("密码是必须的");
$query = "insert into user values(NULL,'$username','$password')";
$result = mysql_query($query);
if(mysql_fetch_assoc($result)) {
//	echo true;//有重复，跳转登录页面
//	header('location:../login.html');
	echo true;
} else {
	echo false;
}
?>