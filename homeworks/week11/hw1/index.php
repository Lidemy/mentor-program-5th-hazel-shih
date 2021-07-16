<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  //若用 SELECT * 會有欄位名稱被覆蓋的問題(右表覆蓋左表)，結果都會是 users table 的資料
  $comment_sql = "SELECT " . 
  "C.id as id, C.content as content, C.created_at as created_at, " .
  "C.username as username, U.nickname as nickname " .
  "FROM hazel_comments as C LEFT JOIN hazel_users as U " . 
  "ON C.username =  U.username " .
  "WHERE C.is_deleted = '留存' " .
  "ORDER BY C.id DESC ".
  "LIMIT ? OFFSET ?";

  $page = 1;
  if(!empty($_GET['page'])){
    $page = $_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn -> prepare($comment_sql);
  $stmt -> bind_param('ii', $items_per_page, $offset);
  $result = $stmt -> execute();

  if(!$result){
    die($conn -> error);
  }

  $result = $stmt -> get_result();

  $username = NULL;
  if($_SESSION['username']){
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
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
        <?php if($_SESSION['identity'] === 'admin'){ ?>
        <a href="admin.php" class="comment-top__btn">管理後台</a>
        <?php } ?>
        <a class="comment-top__btn update_btn">編輯暱稱</a>
        <a href="logout.php" class="comment-top__btn">登出</a>
      <?php } ?>
      </div>
    </div>
    <div class="comment-writting-area">
      <p class="comment-writting-area__desc">哈囉<?php echo escape($user['nickname']); ?>！有什麼想說的嗎？快來搶頭香吧！</p>
      <?php if(!empty($_GET['errCode'])){
        $code = $_GET['errCode'];
        if($code === '1'){
          echo "<h3 class='error'>資料填寫不完整</h3>";
        }
      }
      ?>
      <?php if($username) { ?>
      <form class="hide update_nickname_form" action="handle_update_nickname.php" method="POST">
        <div class="comment-writting-area__form__nickname">
            <span>新的暱稱：</span>
            <input class="comment-writting-area__form__nickname__input" type="text" name="nickname">
            <input class="comment-writting-area__form__submit" type="submit" value="送出">
          </div>
      </form>
      <?php } ?>
      <form class="comment-writting-area__form" method="POST" action="handle_add_comment.php">
        <div class="comment-writting-area__form__content">
          <textarea class="comment-writting-area__form__content__textarea" name="content" cols="50" rows="5" placeholder="請輸入留言..."></textarea>
            <?php if(!$username){ ?>
              <h3 class='error'>請登入以啟用留言功能。</h3>
            <?php } else {
                    if($_SESSION['identity'] === 'banned'){ ?>
                      <h3 class='error'>您的帳號為停權狀態，無法使用留言功能。</h3>
              <?php } else { ?>
              <input class="comment-writting-area__form__submit" type="submit" value="送出">
              <?php } ?>
            <?php } ?>
        </div>
      </form>
    </div>


    <div class="line"></div>
    <section>
      <?php while($row = $result -> fetch_assoc()){ 
      ?>
      <div class="comment-display">
        <div class="comment-display__fake-avatar"></div>
        <div class="comment-display__info">
          <div class="comment-display__info__top">
            <p class="comment-display__info__nickname"><?php echo escape($row['nickname']); ?></p>
            <p class="comment-display__info__nickname"><?php echo "(#" . escape($row['username'] . ")");?></p>
            <p class="comment-display__info__date"></p><?php echo escape($row['created_at']); ?></p>
            <?php if($row['username'] === $username || $_SESSION['identity'] === 'admin'){ ?>
              <div class="comment-display__info__top__update">
                <a href='#' class="start-edit">編輯留言</a>
                <a href='#' class="hide cancel-edit">取消編輯</a>
                <a href='handle_delete_comment.php?id=<?php echo escape($row['id']) ?>' class="delete-comment">刪除留言</a>
              </div>
            <?php } ?>
          </div>
          <div class="comment-display__info__content" id="<?php echo escape($row['id']) ?>"><?php echo escape($row['content']); ?></div>
        </div>
      </div>
      <?php } ?>
      <div class="line"></div>
      <?php 
      $sql = "SELECT count(id) as count FROM hazel_comments WHERE is_deleted = '留存'";
      $stmt = $conn -> prepare($sql);
      $result = $stmt -> execute();
      $result = $stmt -> get_result();
      $row = $result -> fetch_assoc();
      $total_comment = $row['count'];
      $total_page = ceil($total_comment / $items_per_page);
      if($total_comment == 0){
        $total_page = 1;
      }
      
      ?>
      <div class="page-info">
        <div class="page-info__page-count"><span>總共有 <?php echo escape($row['count']) ?> 筆留言，</span><span>頁數：<?php echo escape($page) . '/' . escape($total_page); ?></span></div>
        <?php if($page != 1){ ?>
        <a href="index.php?page=1" class="page-button">回第一頁</a>
        <a href="index.php?page=<?php echo escape($page - 1) ?>" class="page-button">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page){ ?>
        <a href="index.php?page=<?php echo escape($page + 1) ?>" class="page-button">下一頁</a>
        <a href="index.php?page=<?php echo escape($total_page) ?>" class="page-button">最後一頁</a>
        <?php } ?>
      </div>
    
    </section>
  </section>
  <script>
  var updateNickname = document.querySelector('.update_btn');
  updateNickname.addEventListener('click', e => {
    var form = document.querySelector('.update_nickname_form');
    form.classList.toggle('hide');
  });

  var updateContent = document.querySelectorAll('.start-edit');
  if(updateContent){
    for(let i = 0; i < updateContent.length; i++){
      updateContent[i].addEventListener('click', e => {
        const updateContentForm = document.createElement("div");
        const oldContent = e.target.parentElement.parentElement.nextElementSibling;
        const oldContentText = oldContent.innerText;
        const commentID = oldContent.getAttribute('id');
        updateContentForm.innerHTML =
        `
        <form class="comment-writting-area__form edit-content-form" method="POST" action="handle_update_content.php?id=${commentID}">
          <textarea class="comment-writting-area__form__content__textarea" name="content" cols="50" rows="5">${oldContentText}</textarea>
          <input class="comment-writting-area__form__submit" type="submit" value="完成">
        </form>
        `;
        const oldContentElement = e.target.parentElement.parentElement.nextElementSibling;
        oldContentElement.classList.add('hide');
        const commentInfoDiv = e.target.parentElement.parentElement.parentElement;
        commentInfoDiv.appendChild(updateContentForm);
        
        e.target.classList.add('hide');
        e.target.nextElementSibling.classList.remove('hide');
      });
    }
  }

  var cancelEditContent = document.querySelectorAll('.cancel-edit');
  if(cancelEditContent){
    for(let i = 0; i < cancelEditContent.length; i++){
      cancelEditContent[i].addEventListener('click', e => {
        const oldContentElement = e.target.parentElement.parentElement.nextElementSibling;
        oldContentElement.classList.remove('hide');
        oldContentElement.nextElementSibling.remove();
        e.target.classList.add('hide');
        e.target.previousElementSibling.classList.remove('hide');
      });
    }
  }
  
  </script>
</body>
</html>