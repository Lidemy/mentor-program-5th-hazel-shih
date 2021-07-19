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
  <title>Blog-register</title>
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
        <a class="top-bar__nav__link" href="login.php">登入</a>
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
    <section class="login">
      <h1 class="login__title">Register</h1>
      <form action="handle_register.php" method="POST">
        <div class="login__input-div">
          <label class="login__input-label" for="username">USERNAME</label>
          <input type="text" name="username" id="username">
          <?php if($_GET['errCode']){
            $code = $_GET['errCode'];
            if($code === '2'){
              echo '<p class="error">此 username 已被其他人註冊，請使用其他 username</p>';
            } else if($code === '1'){
              echo '<p class="error">未輸入 username 或 password！</p>';
            }
          } ?>
        </div>
        <div class="login__input-div">
          <label class="login__input-label" for="password">PASSWORD</label>
          <input type="password" name="password" id="password">
        </div>
        <input class="login__input-btn" type="submit" value="Register">
      </form>
    </section>
  </section>




  <footer>
    <div>Copyright © 2021 Hazel's Blog All Rights Reserved.</div>
  </footer>
  
</body>
</html>