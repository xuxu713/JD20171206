<?php
require "conn.php";
$username = $_REQUEST["name"] or die("用户名是必须的");
$password = $_REQUEST["pass"] or die("密码是必须的");
$query = " SELECT * FROM user WHERE username='$username' AND password='$password'";
$result = mysql_query($query);
if (mysql_fetch_assoc($result)) {
	echo true;
} else {
	echo false;
}
?>