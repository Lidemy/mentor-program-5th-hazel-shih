<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員，可惡的小駭客ˋˊ');
}

if($_GET['id']){
  $id = $_GET['id'];
  $sql = 'SELECT * from hazel_blog_articles WHERE id =' . $id;
  $result = $conn -> query($sql);
  if(!$result){
    die($conn -> error);
  }
  $row = $result -> fetch_assoc();
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
  <title>Blog-edit</title>
  <link rel="stylesheet" type="text/css" href="node_modules/trix/trix.css">
  <script type="text/javascript" src="trix.js"></script>
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
        <a class="top-bar__nav__link" href="admin.php">管理後台</a>
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

  <section class="post-area">
    <section class="post-area__writting">
      <h1 class="post-area__title">發表文章</h1>
      <?php if($id){ ?>
      <form class="post-area__form" method="POST" action="handle_edit.php?id=<?php echo $id ?>">
      <?php } else { ?>
      <form class="post-area__form" method="POST" action="handle_edit.php">
      <?php } ?>
        <div class="post-area__form__block">
          <h3 class="post-area__form__label">文章標題：</h3>
          <?php if($id){ ?>
            <input class="post-area__form__input" type="text" name="title" value=<?php echo escape($row['title']); ?>>
          <?php } else { ?><input class="post-area__form__input" type="text" name="title" placeholder="請輸入文章標題">
          <?php } ?>
        </div>
        <div class="post-area__form__block">
          <h3 class="post-area__form__label">文章類別：</h3>
          <select class="post-area__form__select" name="category">
            <option <?php if($row['category'] === '神奇寶貝'){ echo 'selected="selected"';} ?> value="神奇寶貝">神奇寶貝</option>
            <option <?php if($row['category'] === '單純mur-mur'){ echo 'selected="selected"';} ?> value="單純mur-mur">單純 mur mur</option>
            <option <?php if($row['category'] === '工程師日常'){ echo 'selected="selected"';} ?> value="工程師日常">工程師日常</option>
            <option <?php if($row['category'] === '好影集推推'){ echo 'selected="selected"';} ?> value="好影集推推">好影集推推</option>
          </select>
        </div>
        <input id="x" type="hidden" name="content">
        <?php if($id){ ?>
          <trix-editor input="x" value=<?php echo $row['content']; ?>></trix-editor>
          <?php } else { ?><trix-editor input="x"></trix-editor>
          <?php } ?>
        <input class="post-area__form__btn" type="submit" value="送出文章">
      </form>
    </section>
  </section>

  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
  
<script src="node_modules/trix/trix.js"></script>
</body>
</html>