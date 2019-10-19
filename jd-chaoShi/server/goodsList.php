<?php
header("content-type:text/html;charset=utf-8");
// 连接数据库
$db=mysqli_connect("127.0.0.1","root","","jd chaoshi");
mysqli_query($db,"set names 'utf8'");

// 获取参数
$page=($_REQUEST["page"]-1)*40;
$type=$_REQUEST["sortType"];
// echo $page;
// 查询获得数据库所有数据
if($type == 0){
    $sql="SELECT * FROM goodsList LIMIT $page,40";
}elseif($type == 1){
    $sql="SELECT * FROM goodsList ORDER BY price DESC LIMIT $page,40";
}else{
    $sql="SELECT * FROM goodsList ORDER BY price ASC LIMIT $page,40";
}

$result = mysqli_query($db,$sql);
// 把数据库中获取的数据转为json返回
$data=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>