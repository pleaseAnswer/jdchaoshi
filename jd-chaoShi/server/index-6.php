<?php
// 数据库获取十二个楼层的数据做页面渲染

header("content-type:text/html;charset=utf-8");
// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");

mysqli_query($db,"set names 'utf8'");
// 获取数据
$sql="SELECT * FROM tweflo";

$result=mysqli_query($db,$sql);

// 把数据转为json返回
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>