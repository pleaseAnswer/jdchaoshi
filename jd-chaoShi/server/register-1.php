<?php
// 注册时的第一个查询,判断手机号是否已经被注册


// echo "ok---";
# （1） 先获取用户提交的参数
$phone    = $_REQUEST["phone"];  

# (2) 通过PHP代码来操作数据库
# 001 先连接数据库
$db = mysqli_connect("127.0.0.1","root","","jd chaoshi");

# 002 先检查当前的手机号是否已经被注册,如果已经被注册，返回错误的提示信息。
$sql = "SELECT * FROM user WHERE phone = '$phone'";

#执行查询语句
$result = mysqli_query($db, $sql);
//var_dump(mysqli_num_rows($result)) ;
/* 
mysqli_result Object
(
    [current_field] => 0
    [field_count] => 4
    [lengths] => 
    [num_rows] => 1   表示查询到的结果有一行
    [type] => 0
)
*/
if(mysqli_num_rows($result) == 1)
{
  /* 该手机号已经被注册！！ */
    $response = "error";
    echo json_encode($response);
}else{
    $response = "ok";
    echo json_encode($response);
}
?>