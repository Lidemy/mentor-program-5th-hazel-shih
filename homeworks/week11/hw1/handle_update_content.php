<?php 
session_start();
require_once('conn.php');

if(!$_SESSION['identity']){
  header('Location: index.php');
  die('無會員身份，無法使用編輯留言功能！');
}

if(empty($_POST['content'])){
  header('Location: index.php?errCode=1');
  die('無填寫留言內容');
}

$content = $_POST['content'];
$id = $_GET['id'];

if($_SESSION['identity'] === 'admin'){
  $sql = "UPDATE hazel_comments SET content=? WHERE id=?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('ss', $content, $id);
  $result = $stmt -> execute();
} else {
  $sql = "UPDATE hazel_comments SET content=? WHERE id=? AND username = ?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('sss', $content, $id, $_SESSION['username']);
  $result = $stmt -> execute();
}

if(!$result){
  die($conn -> error);
}

header('Location: index.php');
exit();
?>