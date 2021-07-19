<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員，可惡的小駭客ˋˊ');
}

$sql = "SELECT * FROM hazel_blog_articles WHERE is_deleted = 'no' ORDER BY id DESC";
$stmt = $conn -> prepare($sql);
$result = $stmt -> execute();
$result = $stmt -> get_result();

if(!$result){
  die($conn -> error);
}

//紀錄從哪一頁按下刪除鍵
unset ($_SESSION['article']);
$_SESSION['admin'] = 'admin';

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:ital,wght@1,300&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&display=swap" rel="stylesheet">
  <title>Blog-admin</title>
</head>
<body>
  <section class="top">
    <div class="top-bar">
      <div class="top-bar__left">
      <div class="top-bar__logo"><a class="top-bar__logo__link" href="index.php">Hazel's Blog</a></div>
        <nav class="top-bar__nav">
        <a class="top-bar__nav__link" href="index.php">回首頁</a>
          <a class="top-bar__nav__link" href="list.php">文章列表</a>
        </nav>
      </div>
      <div class="top-bar__right">
        <?php echo "<p class='top-bar__nav__hello'>Hello! " . escape($_SESSION['username']) . "</p>" ?>
        <a class="top-bar__nav__link" href="edit.php">新增文章</a>
        <a class="top-bar__nav__link" href="handle_logout.php">登出</a>
      </div>
    </div>
    <div class="top-banner">
      <div class="top-banner__info">
        <h1 class="top-banner__title">純粹靠北之地</h1>
        <p class="top-banner__sub-title">WELCOME TO MY BLOG</p>
      </div>
    </div>
  </section>

  <section class="article-list">
    <div class="mark">
      <div class="mark__square">管理後台
        <div class="mark__line"></div>
      </div>
    </div>
    <?php while($row = $result -> fetch_assoc()){ ?>
    <div class="article-list-div">
    <a class="article__list-title" href="article.php?id=<?php echo escape($row['id']); ?>"><?php echo escape($row['title']); ?></a>
      <div class="article-list__info">
        <p class="article-list__info__time"><?php echo escape($row['created_at']); ?></p>
        <a class="article-list__info__btn" href="edit.php?id=<?php echo escape($row['id']); ?>">編輯</a>
        <a onclick="return confirm('確定要刪除文章嗎？');" class="article-list__info__btn" href="handle_delete.php?id=<?php echo escape($row['id']); ?>">刪除</a>
      </div>
    </div>
    <?php } ?>
  </section>




  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
  
</body>
</html>