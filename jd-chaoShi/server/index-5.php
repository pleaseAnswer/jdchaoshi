<?php
// 限时抢购商品信息数据库获取

// 连接数据库
header("content-type:text/html;charset=utf-8");
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");
mysqli_query($db,"set names 'utf8'");
// 获取数据库的数据
$sql="SELECT * FROM xsqg";

$result=mysqli_query($db,$sql);

// 把数据转为json返回
//var_dump(mysqli_num_rows($result));

$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>