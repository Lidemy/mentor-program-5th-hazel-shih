<?php 
  session_start();
  require_once('conn.php');
  
  //首先檢查資料是否有缺漏
  if(empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])){
    header('Location: register.php?errCode=1');
    die('資料不齊全');
  }

  //沒有缺漏就抓資料定義變數
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);


  //下新增會員資料的指令
  $add_user_sql = "INSERT INTO hazel_users(nickname, username, password) VALUES(?, ?, ?)";
  $stmt = $conn -> prepare($add_user_sql);
  $stmt -> bind_param('sss', $nickname, $username, $password);
  $result = $stmt -> execute();
  
  //針對沒有新增成功的錯誤 ＆ 帳號重複做錯誤處理
  if(!$result){
    if($conn -> errno === 1062){
      header('Location: register.php?errCode=2');
    }
    die($conn -> error);
  }

  //若以上 die 都沒發生，就自動登入並且導回首頁
  $_SESSION['username'] = $username;
  $_SESSION['identity'] = 'normal';
  header('Location: index.php');
  exit();

?>