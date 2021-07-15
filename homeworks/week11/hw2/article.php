<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

$id = $_GET['id'];

$sql = 'SELECT * FROM hazel_blog_articles WHERE id=' . $id;
$result = $conn -> query($sql);

if(!$result){
  die($conn -> error);
}

$row = $result -> fetch_assoc();

//紀錄從哪一頁按下刪除鍵
unset ($_SESSION['admin']);
$_SESSION['article'] = 'article';

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
  <title>Blog-page</title>
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
        <?php if($_SESSION['username']){ ?>
          <p class="top-bar__nav__hello">Hello! <?php echo $_SESSION['username']; ?></p>
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

  <section class="post-area">
      <?php if($_SESSION['identity'] === 'admin'){ ?>
        <div class="post-btns">
          <a class="post-btns__btn" href="edit.php?id=<?php echo $row['id']; ?>">編輯</a>
          <a onclick="return confirm('確定要刪除文章嗎？');" class="post-btns__btn" href="handle_delete.php?id=<?php echo $_GET['id']; ?>">刪除</a>
        </div>
      <?php } ?>
      <div class="post__first-row">
        <h1 class="post__title"><?php echo escape($row['title']); ?></h1>
      </div>
      <div class="article__info">
        <div class="article__info__category"><?php echo $row['category']; ?></div>
        <div class="article__info__author">Hazel Shih</div>
        <div class="article__info__time"><?php echo $row['created_at']; ?></div>
      </div>
      <div class="post-content">
      <?php echo $row['content']; ?>
      </div>
    <section class="self-introduce">
      <img class="self-introduce__avatar" src="hazel.jpg">
      <div class="self-introduce__intro">
        <h1 class="self-introduce__intro__name">Hazel Shih</h1>
        <p class="self-introduce__intro__text">嗨哇係 Hazel！小時候幻想長大成為神奇寶貝大師，殊不知最靠近成為神奇寶貝大師是小時候的自己。阿這個部落格 just for homework，上面的文章都不是我打的喔喔喔～文章來源都已附上哩！感謝您的蒞臨哈！</p>
        <div class="self-introduce__intro__social">
          <a href="https://zh-tw.facebook.com/"><img class="self-introduce__intro__social__img"src="facebook.png"></a>
          <a href="https://zh-tw.facebook.com/"><img class="self-introduce__intro__social__img"src="instagram.png"></a>
          <a href="https://zh-tw.facebook.com/"><img class="self-introduce__intro__social__img"src="google-plus.png"></a>
        </div>
      </div>
    </section> 
  </section>


  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
  
</body>
</html>