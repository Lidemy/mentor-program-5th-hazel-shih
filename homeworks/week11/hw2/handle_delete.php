<?php 
session_start();
require_once('conn.php');

if(!$_SESSION['identity']){
  die('你不是管理員，可惡的小駭客ˋˊ');
}

$id = $_GET['id'];

$sql = "UPDATE `hazel_blog_articles` SET is_deleted = 'yes' WHERE id = ?";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('i', $id);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

if($_SESSION['admin']){
  header('Location: admin.php');
  exit();
}

if($_SESSION['article']){
  header('Location: index.php');
  exit();
}


?>