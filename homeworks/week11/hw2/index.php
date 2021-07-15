<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

$page = 1;
if($_GET['page']){
  $page = $_GET['page'];
}
//計算文章總篇數
$sql = "SELECT * FROM hazel_blog_articles WHERE is_deleted = 'no'";
$result = $conn -> query($sql);

if(!$result){
  die($conn -> error);
}

$articles_num = $result -> num_rows;

//抓出每頁文章資訊
$article_per_page = 5;
$offset = ($page - 1) * $article_per_page;
$total_page = ceil($articles_num / $article_per_page);

$sql = "SELECT * FROM hazel_blog_articles WHERE is_deleted = 'no' ORDER BY id DESC " . 
"LIMIT " . $article_per_page . " OFFSET " . $offset;
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
  <title>Blog</title>
</head>
<body>
  <section class="top">
    <div class="top-bar">
      <div class="top-bar__left">
        <div class="top-bar__logo"><a class="top-bar__logo__link" href="index.php">Hazel's Blog</a></div>
        <nav class="top-bar__nav">
          <a class="top-bar__nav__link" href="list.php">文章列表</a>
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

  <section class="middle">
    <section class="about-me">
      <div class="about-me__avatar"></div>
      <h1 class="about-me__name">Hazel</h1>
      <p class="about-me__text">嗨哇係 Hazel！小時候幻想長大成為神奇寶貝大師，殊不知最靠近成為神奇寶貝大師是小時候的自己。阿這個部落格 just for homework，上面的文章都不是我打的喔喔喔～文章來源都已附上哩！感謝您的蒞臨哈！</p>
    </section>
    <section class="articles">
      <div class="mark">
        <div class="mark__square">最新文章
          <div class="mark__line"></div>
        </div>
      </div>
      <?php while($row = $result -> fetch_assoc()){ ?>
      <div class="article">
        <img class="article__img" src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80">
        <div class="article__right-part">
          <a class="article__title" href="article.php?id=<?php echo $row['id']; ?>"><?php echo escape($row['title']); ?></a>
          <div class="article__info">
            <div class="article__info__category"><?php echo escape($row['category']); ?></div>
            <div class="article__info__author">Hazel Shih</div>
            <div class="article__info__time"><?php echo $row['created_at']; ?></div>
          </div>
          <div class="article__content"><?php echo stripTags($row['content']); ?></div>
          <a class="article__read-more" href="article.php?id=<?php echo $row['id']; ?>">閱讀更多</a>
        </div>
      </div>
      <?php } ?>
      <div class="page-system">
      <?php if($page > 1){ ?>
      <a class="page-system__link" href="index.php">回首頁</a>
      <a class="page-system__link" href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if($page < $total_page){ ?>
      <a class="page-system__link" href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <a class="page-system__link" href="index.php?page=<?php echo $total_page ?>">最後頁</a>
      <?php } ?>
    </div>

    </section>
  </section>

  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
</body>
</html>