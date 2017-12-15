<?php
	$obj = $_REQUEST['obj'];
//$obj = '.submyjd .list-top';
	$ele = $_REQUEST['ele'];
//$ele = 'a';

mysql_connect("localhost:3306", "root", "12345678");
mysql_select_db("xuyuanjd");
mysql_query("SET NAMES UTF8");
$query = "select img from jd2 where obj = '{$obj}' and ele = '{$ele}' order by sid";
$result = mysql_query($query);
$arr = array();
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$res = $row["result"];
	array_push($arr, $res);
}
$jobj = new stdclass();
foreach ($arr as $key => $value) {
	$jobj -> $key = $value;
}
echo json_encode($arr);
?>