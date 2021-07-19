<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員，可惡的小駭客ˋˊ');
}

//更新文章
if($_GET['id']){
  $id = $_GET['id'];
}

if(empty($_POST['title']) || empty($_POST['category']) || empty($_POST['content'])){
  header('Location: edit.php?errCode=1');
  die('資料未填寫完全');
}

$title = $_POST['title'];
$category = $_POST['category'];
$content = $_POST['content'];

//兩種編輯情形：更新文章、產新文章
$sql = NULL;
if($id){
  $sql = 'UPDATE hazel_blog_articles SET title = ?, category = ?, content = ? WHERE id =' . $id;
} else {
  $sql = 'INSERT INTO hazel_blog_articles(title, category, content) VALUES (?, ?, ?)';
}
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('sss', $title, $category, $content);
$result = $stmt -> execute();

if(!$result){
  die($conn -> error);
}

if($id){
  header('Location: article.php?id=' . escape($id));
  exit();
} else {
  header('Location: index.php');
  exit();
}


?>