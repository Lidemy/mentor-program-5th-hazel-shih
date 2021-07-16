<?php 
session_start();
require_once('conn.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員！可惡的小駭客');
}

if(empty($_GET['username'])){
  if($_SESSION['request-origin'] === 'admin'){
    header('Location: admin.php?errCode=1');
    exit();
  } else {
    header('Location: user-info.php?errCode=1');
    exit();
  }
  die('無填寫 username');
}

$username = $_GET['username'];
$sql = "SELECT id, nickname, username, identity FROM `hazel_users` WHERE username = ?";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('s', $username);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

$result = $stmt -> get_result();

if($result -> num_rows === 0){
  if($_SESSION['request-origin'] === 'admin'){
    header('Location: admin.php?errCode=2');
    exit();
  } else {
    header('Location: user-info.php?errCode=2');
    exit();
  }
  die('無填寫 username');
}

header('Location: user-info.php?username=' . $username);
exit();
?>