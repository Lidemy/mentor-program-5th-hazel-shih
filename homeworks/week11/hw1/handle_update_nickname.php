<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin' && $_SESSION['identity'] !== 'banned' && $_SESSION['identity'] !== 'normal'){
  header('Location: index.php');
  die('無會員身份，無法使用編輯暱稱功能！');
}

if(empty($_POST['nickname'])){
  header('Location: index.php?errCode=1');
  exit();
}

$nickname = $_POST['nickname'];
$username = $_SESSION['username'];

$sql = "UPDATE hazel_users SET nickname=? WHERE username=?";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('ss', $nickname, $username);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

alert('已更新暱稱！', 'index.php');
exit();

?>