<?php 
  session_start();
  require_once("conn.php");
  
  $username = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  $result = $conn -> query('SELECT * FROM hazel_comments ORDER BY id DESC');
  if(!$result){
    die('Error:' . $conn -> error);
  }
?>

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
      <h1 class="comment-top__title">Comments</h1>
      <div class="comment-top__btns">
      <?php if(!$username){ ?>
        <a href="register.php" class="comment-top__btn">註冊</a>
        <a href="login.php" class="comment-top__btn">登入</a>
      <?php } else { ?>
        <a href="logout.php" class="comment-top__btn">登出</a>
      <?php } ?>
      </div>
    </div>
    <div class="comment-writting-area">
      <p class="comment-writting-area__desc">哈囉<?php echo $username . '！'; ?>有什麼想說的嗎？快來搶頭香吧！</p>
      <form class="comment-writting-area__form" method="POST" action="handle_add_comment.php">
        <?php 
          if(!empty($_GET['errCode'])){
            $code = $_GET['errCode'];
            if($code === '1'){
              echo "<p class='error'>暱稱或留言內容未填寫！</p>";
            }
          }
        ?>
        <div class="comment-writting-area__form__content">
          <textarea class="comment-writting-area__form__content__textarea" name="content" cols="50" rows="5" placeholder="請輸入留言..."></textarea>
          <?php if($username){ ?>
            <input class="comment-writting-area__form__submit" type="submit" value="送出">
          <?php } else { ?>
          <h3 class='error'>登入後才可以使用留言功能！</h3>
          <?php } ?>
        </div>
      </form>
    </div>

    <div class="line"></div>
    <section>
      <?php 
        while($row = $result -> fetch_assoc()){
      ?>
      <div class="comment-display">
        <div class="comment-display__fake-avatar"></div>
        <div class="comment-display__info">
          <div class="comment-display__info__top">
            <p class="comment-display__info__nickname"><?php echo $row['nickname']; ?></p>
            <p class="comment-display__info__date"><?php echo $row['created_at']; ?></p>
          </div>
          <div class="comment-display__info__content"><?php echo $row['content']; ?></div>
        </div>
      </div>
      <?php } ?>

    
    </section>

    

  </section>
  
</body>
</html>