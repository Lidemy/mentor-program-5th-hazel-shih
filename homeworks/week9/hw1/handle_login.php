<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  //錯誤檢查一、檢查資料填寫狀況
  if(empty($_POST['username']) || empty($_POST['password'])){  
    header('Location: login.php?errCode=1');
    die('資料不齊全');
  } 
  
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("SELECT * FROM hazel_users WHERE username='%s' AND password='%s'",
  $username,
  $password);

  $result = $conn -> query($sql);
  
  //錯誤檢查二、檢查 SQL query 有沒有執行成功
  if(!$result){
    die($conn -> error);
  }
  
  //若登入成功就自動跳轉回 index.php
  if($result->num_rows){
    //登入成功
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('Location: login.php?errCode=2');
  }
?>
<!-- <a href="index.php">點我回上一頁</a> -->