<?php
/*//	$obj = $_REQUEST['obj'];
$obj = '.submyjd .list-top';
//	$ele = $_REQUEST['ele'];
$ele = 'a';

mysql_connect("localhost:3306", "root", "12345678");
mysql_select_db("xuyuanjd");
mysql_query("SET NAMES UTF8");
$query = "select result from jd1 where obj = '{$obj}' and ele = '{$ele}' order by ordernum";
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
echo json_encode($arr);*/

header("Content-type:text/html;charset=utf-8");//字符编码设置  
//$obj = $_REQUEST['obj'];
$obj = '.sk-item-ul';
$servername = "localhost:3306";  
$username = "root";  
$password = "12345678";  
$dbname = "xuyuanjd";  
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname); 
//$sql = "select * from jd2 where obj = '{$obj}'";
$sql = "select * from jd2";
$result = mysqli_query($con,$sql);  
$jarr = array();
while ($rows=mysqli_fetch_array($result,MYSQL_ASSOC)){
    $count=count($rows);//不能在循环语句中，由于每次删除 row数组长度都减小  
    for($i=0;$i<$count;$i++){  
        unset($rows[$i]);//删除冗余数据  
    }
    array_push($jarr,$rows);
}
//print_r($jarr);//查看数组
//echo "<br/>";
//echo '<hr>';
//echo '编码后的json字符串：';
echo $str=json_encode($jarr);//将数组进行json编码
//$arr=json_decode($str);//再进行json解码
//echo '解码后的数组：';
//echo json_encode($arr);//打印解码后的数组，数据存储在对象数组中
//mysqli_close($con);
?>