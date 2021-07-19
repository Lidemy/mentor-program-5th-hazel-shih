<?php 
session_start();
require_once('conn.php');

if(!$_SESSION['username'] || $_SESSION['identity'] === 'banned'){
  header('Location: index.php');
  die('沒有登入或是被停權，無法使用留言功能！');
}

if(empty($_POST['content'])){
  header('Location: index.php?errCode=1');
  die('沒有填寫留言內容');
}

$content = $_POST['content'];
$username = $_SESSION['username'];

$sql = "INSERT INTO hazel_comments(username, content) VALUES(?, ?)";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('ss', $username, $content);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

header('Location: index.php');
exit();

?>