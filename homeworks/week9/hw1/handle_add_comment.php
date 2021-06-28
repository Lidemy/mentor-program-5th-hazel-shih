<?php 
  session_start();
  require_once('conn.php');

  //錯誤檢查一、檢查資料填寫狀況
  if(empty($_POST['content'])){  
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  } 
  
  $username = $_SESSION['username'];
  echo $username;

  $nickname_query = sprintf("SELECT nickname from hazel_users WHERE username='%s'",
  $username);
  $nickname_result = $conn->query($nickname_query);
  $nickname_row = $nickname_result -> fetch_assoc();
  $nickname = $nickname_row['nickname'];


  $content = $_POST['content'];

  $sql = sprintf("INSERT INTO hazel_comments(nickname, content) VALUES('%s', '%s')",
  $nickname,
  $content);

  $result = $conn -> query($sql);
  
  //錯誤檢查二、檢查 SQL query 有沒有執行成功
  if(!$result){
    die($conn -> error);
  }
  
  //自動跳轉回 index.php
  header('Location: index.php');
?>
<!-- <a href="index.php">點我回上一頁</a> -->