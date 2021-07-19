<?php 
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if($_SESSION['identity'] !== 'admin'){
    die('你不是管理員！可惡的小駭客');
  }

  $_SESSION['request-origin'] = 'admin';

  $sql = "SELECT id, nickname, username, identity FROM `hazel_users` " . 
  "WHERE identity != 'admin' ORDER BY id ASC limit ? offset ?";
  $page = 1;
  if(!empty($_GET['page'])){
    $page = $_GET['page'];
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('ss', $items_per_page, $offset);
  $result = $stmt -> execute();


  if(!$result){
    die($conn -> error);
  }

  $result = $stmt -> get_result();

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
      <h1 class="comment-top__title">管理後台</h1>
      <div class="comment-top__btns">
        <?php if($search_username){ ?>
        <a href="admin.php" class="comment-top__btn">回 user 列表</a>
        <?php } ?>
        <a href="index.php" class="comment-top__btn">回留言板</a>
        <a href="logout.php" class="comment-top__btn">登出</a>
      </div>
    </div>
    <div class="line"></div>
    <section>
      <form class="search-user-bar__form" action="handle_search_user.php" method="GET">
      <?php $_SESSION['request-origin'] = 'admin'; ?>
        <label class="search-user-bar__label" for="username">搜尋使用者：</label></label><input class="search-user-bar" type="text" placeholder="請輸入使用者的帳號" name="username" id="username">
        <button class="search-user-bar__btn" type="submit"><img class="search-user-bar__btn__img" src="search.png"></button>
      </form>
      <?php if(!empty($_GET['errCode'])){
          $code = $_GET['errCode'];
          if($code === '1'){
            echo "<h3 class='error'>未填寫 username</h3>";
          } else if($code === '2'){
            echo "<h3 class='error'>查無此 username</h3>";
          }
        }
        ?>
      <table class="edit-user-table">
        <tbody class="edit-user-table__body">
          <tr class="edit-user-table__row" id="first-row">
            <td class="edit-user-table__item">使用者 id</td>
            <td class="edit-user-table__item">暱稱</td>
            <td class="edit-user-table__item">帳號</td>
            <td class="edit-user-table__item">身份</td>
          </tr>
        <?php while($row = $result -> fetch_assoc()){ ?>
        <tr class="edit-user-table__row">
          <td class="edit-user-table__item"><?php echo escape($row['id']) ?></td>
          <td class="edit-user-table__item"><?php echo escape($row['nickname']) ?></td>
          <td class="edit-user-table__item"><a href="user-info.php?username=<?php echo escape($row['username']); ?>"><?php echo $row['username'] ?></a></td>
          <td class="edit-user-table__item">
            <form method="POST" action="handle_update_identity.php?username=<?php echo escape($row['username']) ?>">
              <select name="selected-identity">
                <option><?php echo escape($row['identity']) ?></option>
                <option><?php if($row['identity'] == '一般使用者'){
                  echo '停權使用者'; } else { echo '一般使用者'; } ?></option>
              </select>
              <input type="submit" value="送出">
            </form>
          </td>
        </tr>
        <?php } ?>
  
      </tbody>

      </table>


      
      <div class="line"></div>
  

      <?php 
      $sql = "SELECT count(id) as count FROM hazel_users WHERE identity != 'admin'";
      $stmt = $conn -> prepare($sql);
      $result = $stmt -> execute();
      $result = $stmt -> get_result();
      $row = $result -> fetch_assoc();
      $total_user = $row['count'];
      $total_page = ceil($total_user / $items_per_page);
      
      ?>
      <div class="page-info">
      <div class="page-info__page-count"><span>總共有 <?php echo $row['count'] ?> 個使用者，</span><span>頁數：<?php echo $page . '/' . $total_page; ?></span></div>
      <?php if($page != 1){ ?>
      <a href="admin.php?page=1" class="page-button">回第一頁</a>
      <a href="admin.php?page=<?php echo $page - 1 ?>" class="page-button">上一頁</a>
      <?php } ?>
      <?php if($page != $total_page){ ?>
      <a href="admin.php?page=<?php echo $page + 1 ?>" class="page-button">下一頁</a>
      <a href="admin.php?page=<?php echo $total_page ?>" class="page-button">最後一頁</a>
      <?php } ?>

      </div>
    
    </section>
  </section>



  <script>

  
  </script>
</body>
</html>