<?php
// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");

// 获取前端数据
// title=${ele.titlt}&li=${ele.li}&subtitle=${ele.subtitle}&sublist=${ele.sublist}
$title=$_REQUEST["title"];
$li=$_REQUEST["li"];
$subtitle=$_REQUEST["subtitle"];
$sublist=$_REQUEST["sublist"];

// 向数据库插入数据
$insertSql="insert into `navigation_bar` (`id`,`title`,`li`,`subtitle`,`sublist`) values (null,'$title','$li','$subtitle','$sublist')";

$res=mysqli_query($db,$insertSql);
$response="ok";
echo json_encode($response);
?>