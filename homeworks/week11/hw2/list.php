<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

$sql = "SELECT * FROM hazel_blog_articles WHERE is_deleted = 'no' ORDER BY id DESC";
$result = $conn -> query($sql);

if(!$result){
  die($conn -> error);
}


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
        </nav>
      </div>
      <div class="top-bar__right">
        <?php if($_SESSION['username']){ ?>
          <p class="top-bar__nav__hello">Hello! <?php echo escape($_SESSION['username']); ?></p>
          <?php if($_SESSION['identity'] === 'admin'){
            echo '<a class="top-bar__nav__link" href="admin.php">管理後台</a>';
          } ?>
          <a class="top-bar__nav__link" href="handle_logout.php">登出</a>
        <?php } else { ?>
          <a class="top-bar__nav__link" href="register.php">註冊</a>
          <a class="top-bar__nav__link" href="login.php">登入</a>
        <?php } ?>
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
      <div class="mark__square">文章列表
        <div class="mark__line"></div>
      </div>
    </div>
    <?php while($row = $result -> fetch_assoc()){ ?>
    <div class="article-list-div">
    <a class="article__title" href="article.php?id=<?php echo $row['id']; ?>"><?php echo escape($row['title']); ?></a>
      <div class="article-list__info">
        <p class="article-list__info__time"><?php echo $row['created_at']; ?></p>
      </div>
    </div>
    <?php } ?>
  </section>




  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
  
</body>
</html>