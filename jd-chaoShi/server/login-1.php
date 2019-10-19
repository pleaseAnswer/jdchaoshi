<?php
// 判断登录账户跟密码

// 获取用户提交的数据
$user=$_REQUEST["user"];
$password=$_REQUEST["password"];

// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");

// 查询手机号|用户名在数据库中的对应信息
$sq1="select * from user where username='$user' or phone='$user'";
$sq2="select * from user where password='$password'";
$result1=mysqli_query($db,$sq1);
$result2=mysqli_query($db,$sq2);
// var_dump($result);
// var_dump(mysqli_num_rows($result));


if(mysqli_num_rows($result1)==0){
    $response["user"] = "default";
}else{
    $response["user"] = "success";
    if(mysqli_num_rows($result2)==0){
        $response["password"]="default";
    }else if($result1 == $result2){
        $response["password"]="success";
    }
}
echo json_encode($response,true);

?>