<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_POST['username']) || empty($_POST['password'])){
    header('Location: login.php?errCode=1');
    die('資料不齊全');
  }

  $username = $_POST['username'];
  $password = $_POST['password']; //使用者輸入的 password

  $select_user_sql = "SELECT * FROM hazel_users WHERE username=?";
  $stmt = $conn -> prepare($select_user_sql);
  $stmt -> bind_param('s', $username);
  $result = $stmt -> execute();
  
  //query 執行不成功的狀況
  if(!$result){
    die($conn -> error);
  }

  $result = $stmt -> get_result();
  //查無此用戶的狀況
  if($result -> num_rows === 0){
    header('Location: login.php?errCode=2');
    die('查無此筆資料：' . $conn_error);
  }

  //有查到使用者
  $row = $result -> fetch_assoc();
  if(password_verify($password, $row['password'])){
    $_SESSION['username'] = $username;
    identityAuthentication($username);
    header('Location: index.php');
    exit();
  } else {
    header('Location: login.php?errCode=2');
    die('查無此筆資料：' . $conn_error);
  }

?>