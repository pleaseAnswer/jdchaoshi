<?php
$db = mysqli_connect("127.0.0.1", "root", "", "jd chaoshi");
$sql = "SELECT * FROM cart";
$data = mysqli_fetch_all(mysqli_query($db, $sql),MYSQLI_ASSOC);

$total = 0;
for($i = 0;$i<count($data);$i++)
{
  $total += $data[$i]["num"];
}
echo json_encode(array("total"=>$total),true);
?>