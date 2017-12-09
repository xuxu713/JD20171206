<?php
	$obj = $_POST["obj"];
	$ele = $_POST["ele"];

	mysql_connect("localhost:3300","root","123456");
    mysql_select_db("xuyuanjd");
    mysql_query("SET NAMES UTF-8");
    $query = "select result from test where obj = '{$obj}' and ele = '{$ele}' order by ordernum";
	$result = mysql_query($query); 
	$arr=array();
	while($row = mysql_fetch_array($result, MYSQL_ASSOC)){
	$res = $row["result"]; 
	array_push($arr,$res);
	}
	echo json_encode($arr);
?>