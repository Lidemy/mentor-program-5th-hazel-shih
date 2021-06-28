
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>留言板</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <header class="warning">注意！本站為教學用網站，因教學用途刻意忽略資安實作，註冊時請勿使用任何的帳號密碼。</header>
  <section class="comment-area">
    <div class="comment-top">
      <h1 class="comment-top__title">Register</h1>
      <div class="comment-top__btns">
        <a href="index.php" class="comment-top__btn">回留言板</a>
        <a href="login.php" class="comment-top__btn">登入</a>
      </div>
    </div>
    <div class="comment-writting-area">
      <form class="comment-writting-area__form" method="POST" action="handle_register.php">
        <div class="comment-writting-area__form__nickname">
          <span>暱稱：</span>
          <input class="comment-writting-area__form__nickname__input" type="text" name="nickname">
        </div>
        <div class="comment-writting-area__form__nickname">
          <span>帳號：</span>
          <input class="comment-writting-area__form__nickname__input" type="text" name="username">
        </div>
        <div class="comment-writting-area__form__nickname">
          <span>密碼：</span>
          <input class="comment-writting-area__form__nickname__input" type="password" name="password">
        </div>
        <?php 
          if(!empty($_GET['errCode'])){
            $code = $_GET['errCode'];
            if($code === '1'){
              echo "<p class='error'>會員資料未填寫完全！</p>";
            } else if($code === '2'){
              echo "<p class='error'>此帳號已被註冊，換一個吧～</p>";
            }
          }
        ?>
          <input class="comment-writting-area__form__submit" type="submit" value="送出">
      </form>
    </div>

    

  </section>
  
</body>
</html>