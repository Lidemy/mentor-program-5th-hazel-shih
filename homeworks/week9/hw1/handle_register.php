<?php 
  require_once('conn.php');

  //錯誤檢查一、檢查資料填寫狀況
  if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])){  
    header('Location: register.php?errCode=1');
    die('資料不齊全');
  } 
  
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("INSERT INTO hazel_users(nickname, username, password) VALUES('%s', '%s', '%s')",
  $nickname,
  $username,
  $password);

  $result = $conn -> query($sql);

  //錯誤檢查二、檢查 SQL query 有沒有執行成功以及帳號是否重複
  if(!$result){
    $code = $conn -> errno;
    if($code === 1062){ //duplicate error code
      header('Location: register.php?errCode=2');
    }
    die($conn -> error);
  }
  
  //自動跳轉回 index.php
  header('Location: index.php');
?>
<!-- <a href="index.php">點我回上一頁</a> -->