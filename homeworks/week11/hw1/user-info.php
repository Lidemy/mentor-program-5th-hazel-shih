<?php 
session_start();
require_once('conn.php');
require_once('utils.php');

if($_SESSION['identity'] !== 'admin'){
  die('你不是管理員！可惡的小駭客');
}

$username = $_GET['username'];

//上方表格(使用者資訊的 sql)
$sql = "SELECT id, nickname, username, identity FROM `hazel_users` " . 
"WHERE username = ?";

$stmt = $conn -> prepare($sql);
$stmt -> bind_param('s', $username);
$result = $stmt -> execute();


if(!$result){
  die($conn -> error);
}

$result = $stmt -> get_result();

//下方表格（留言紀錄的 sql）
$sql = "SELECT id, content, created_at, is_deleted FROM `hazel_comments` " . 
"WHERE username = ? ORDER BY id DESC " . 
"LIMIT? OFFSET ?";

$page = 1;
if(!empty($_GET['page'])){
  $page = $_GET['page'];
}
$comment_per_page = 5;
$offset = ($page - 1) * $comment_per_page;

$stmt = $conn -> prepare($sql);
$stmt -> bind_param('sii', $username, $comment_per_page, $offset);
$comment_result = $stmt -> execute();

if(!$comment_result){
  die($conn -> error);
}

$comment_result = $stmt -> get_result();

//留言紀錄的頁數系統
$sql = "SELECT count(id) as count FROM `hazel_comments` WHERE username = ?";
$stmt = $conn -> prepare($sql);
$stmt -> bind_param('s', $username);
$count_result = $stmt -> execute();

if(!$count_result) {
  die($conn -> error);
}

$count_result = $stmt -> get_result();
$count_row = $count_result -> fetch_assoc();
$total_page = ceil($count_row['count'] / $comment_per_page);
if($count_row['count'] == 0){
  $total_page = 1;
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
      <h1 class="comment-top__title">管理後台</h1>
      <div class="comment-top__btns">
        <a href="admin.php" class="comment-top__btn">回 user 列表</a>
        <a href="index.php" class="comment-top__btn">回留言板</a>
        <a href="logout.php" class="comment-top__btn">登出</a>
      </div>
    </div>
    <div class="line"></div>
    <section>
      <form class="search-user-bar__form" action="handle_search_user.php" method="GET">
        <?php $_SESSION['request-origin'] = 'user-info'; ?>
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
    <?php if(empty($_GET['errCode'])){ ?>
      <section class="edit-user">
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
            <td class="edit-user-table__item"><?php echo escape($row['username']) ?></a></td>
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
      </section>

    
      <section class="comment-record">
        <h2 class="comment-record-title"><?php echo escape($username) ?>的留言紀錄：</h2>
        <?php if($comment_result -> num_rows !== 0){ ?>
        <table class="edit-user-table">
          <tbody class="edit-user-table__body">
            <tr class="edit-user-table__row" id="first-row">
              <td class="edit-user-table__item">留言 id</td>
              <td class="edit-user-table__item">內容</td>
              <td class="edit-user-table__item">發布時間</td>
              <td class="edit-user-table__item">是否刪除</td>
            </tr>
          <?php while($row = $comment_result -> fetch_assoc()){ ?>
          <tr class="edit-user-table__row">
            <td class="edit-user-table__item"><?php echo escape($row['id']) ?></td>
            <td class="edit-user-table__item"><?php echo escape($row['content']) ?></td>
            <td class="edit-user-table__item"><?php echo escape($row['created_at']); ?></a></td>
            <td class="edit-user-table__item">
            <form method="POST" action="handle_delete_comment.php?id=<?php echo escape($row['id']) ?>&username=<?php echo escape($username); ?>">
                <select name="comment-status">
                  <option><?php echo escape($row['is_deleted']) ?></option>
                  <option><?php if($row['is_deleted'] == '留存'){ echo '刪除'; } else { echo '留存'; } ?></option>
                </select>
                <input type="submit" value="送出">
              </form>
            </td>
          </tr>
          <?php } ?>
        </tbody>
        </table>
        <?php } else { ?>
          <h2 class="comment-record__result-word">沒有任何留言！</h2>
        <?php } ?>
      </section>
      
      <div class="line"></div>
      <div class="page-info">
        <div class="page-info__page-count"><span>總共有 <?php echo escape($count_row['count']) ?> 筆留言，</span><span>頁數：<?php echo escape($page) . '/' . escape($total_page); ?></span></div>
        <?php if($page != 1){ ?>
        <a href="user-info.php?username=<?php echo escape($username) ?>&page=1" class="page-button">回第一頁</a>
        <a href="user-info.php?username=<?php echo escape($username) ?>&page=<?php echo escape($page - 1) ?>" class="page-button">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page){ ?>
        <a href="user-info.php?username=<?php echo escape($username) ?>&page=<?php echo escape($page + 1) ?>" class="page-button">下一頁</a>
        <a href="user-info.php?username=<?php echo escape($username) ?>&page=<?php echo escape($total_page) ?>" class="page-button">最後一頁</a>
        <?php } ?>
      </div>
    </section>
  <?php } ?>
  </section>


</body>
</html>