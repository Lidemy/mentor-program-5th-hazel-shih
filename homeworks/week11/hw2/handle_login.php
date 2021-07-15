<?php 
session_start();
require_once('conn.php');

if(empty($_POST['username']) || empty($_POST['password'])){
  header('Location: login.php?errCode=1');
  die('資料未填寫完全');
}

$username = $_POST['username'];
$password = $_POST['password'];


$sql = 'SELECT * from hazel_blog_users WHERE username = ?';
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('s', $username);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

$result = $stmt -> get_result();
if($row = $result -> fetch_assoc()){
  if(password_verify($password, $row['password'])){
    if($row['identity'] === 'admin'){
      $_SESSION['identity'] = 'admin';
    }
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('Location: login.php?errCode=3');
    die('密碼錯誤');
  }
} else {
  header('Location: login.php?errCode=2');
  die('查無此用戶');
}

?>