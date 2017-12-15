<?php
require "conn.php";
@$username = $_REQUEST["name"];
@$password = $_REQUEST["pass"];
$query = "select * from user where username='$username'";
$result = mysql_query($query);
if (mysql_fetch_array($result)) {
	echo true;
} else {
	echo false;
}
if (isset($_POST['submit']) && $_POST['submit'] == "立即注册") {
	$user = $_POST['username'];
	$pass = md5($_POST['password']);
	echo $user;
	$query = "insert user(sid,username,password) values(default,'$user','$pass')";
	mysql_query($query);
}
?>