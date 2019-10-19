<?php
header("content-type:text/html;charset=utf-8");
// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");
mysqli_query($db,"set names 'utf8'");

// 查询获取数据
$sql="SELECT * FROM goodsList";

$result=mysqli_query($db,$sql);
$count=ceil(mysqli_num_rows($result)/40);
echo '{"count":'.$count."}";
?>