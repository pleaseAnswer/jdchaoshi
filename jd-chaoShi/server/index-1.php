<?php
// 登陆成功之后，将用户名返回到主页

// 获取用户提交的数据
$user=$_REQUEST["user"];
// echo $user;
// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");

// 查询
$sql="SELECT * FROM user where phone='$user' or username='$user'";
// $sql="SELECT * FROM `jd chaoshi`.`user` WHERE (`phone` LIKE '%14778864955%')  LIMIT 0,1000";

$result1=mysqli_query($db,$sql);
// var_dump(mysqli_num_rows($result1));

// 得到数据库返回的一整条数据
$data=mysqli_fetch_all($result1,MYSQL_ASSOC);
echo json_encode($data,true);

?>