<?php
	$obj = $_REQUEST['obj'];
//$obj = '.submyjd .list-top';
	$ele = $_REQUEST['ele'];
//$ele = 'a';

mysql_connect("localhost:3306", "root", "12345678");
mysql_select_db("xuyuanjd");
mysql_query("SET NAMES UTF8");
$query = "select result from jd1 where obj = '{$obj}' and ele = '{$ele}' order by ordernum";
$result = mysql_query($query);
$arr = array();
for($i=0;$i<mysql_num_rows($result);$i++){
		$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	};
	class Data{}
	$d1=new Data();
	$d1->data=$arr;
echo json_encode($d1);
?>