<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員！可惡的小駭客');
}

$username = $_GET['username'];
$new_identity = $_POST['selected-identity'];

$sql = "UPDATE `hazel_users` SET identity = ? WHERE username = ?";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('ss', $new_identity, $username);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

$result = $stmt -> get_result();

alert('成功編輯使用者身份！', $_SERVER['HTTP_REFERER']);
exit();
?>