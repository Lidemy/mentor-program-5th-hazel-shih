<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

$id = $_GET['id'];

if($_SESSION['identity'] === 'admin'){
  //來自管理員後台的請求
  if($_POST['comment-status']){
    $comment_status = $_POST['comment-status'];
      $sql = "UPDATE hazel_comments SET is_deleted = ? WHERE id = ?";
      $stmt = $conn -> prepare($sql);
      $stmt -> bind_param('si', $comment_status, $id);
      $result = $stmt -> execute();
      if(!$result){
        die($conn -> error);
      }
      alert('已變更留言狀態！', 'user-info.php?username=' . $_GET['username']);
      exit();
  } else {
    //來自管理員前台的請求
    $sql = "UPDATE hazel_comments SET is_deleted = '刪除' WHERE id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('i', $id);
    $result = $stmt -> execute();
    if(!$result){
      die($conn -> error);
    }
    alert('成功刪除留言！', 'index.php');
    exit();
  }
}

//來自非管理員的請求
if($_SESSION['identity'] === 'normal' || $_SESSION['identity'] === 'banned') {
  $sql = "UPDATE hazel_comments SET is_deleted = '刪除' WHERE id = ? AND username = ?";
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('is', $id, $_SESSION['username']);
  $result = $stmt -> execute();
  if(!$result){
    die($conn -> error);
  }
  alert('成功刪除留言！', 'index.php');
  exit();
}
?>