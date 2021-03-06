<?php 
  require_once('conn.php');
  header('Content-type:application/json;chartset=utf8');
  header('Access-Control-Allow-Origin: *');


  if(empty($_GET['site_key'])){
    $json = array(
    'ok' => false,
    'message' => 'Please send site_key in url'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];
  $comment_per_page = 5;

  $sql = "SELECT id, nickname, content, created_at FROM hazel_w11_discuss WHERE site_key = ? " .
  (empty($_GET['lastID']) ? "" : "and id < ? ") .
  "ORDER BY id DESC LIMIT ?";
  $stmt = $conn -> prepare($sql);
  if(empty($_GET['lastID'])){
    $stmt -> bind_param('si', $site_key, $comment_per_page);
  } else {
    $stmt -> bind_param('sii', $site_key, $_GET['lastID'], $comment_per_page);
  }
  
  $result = $stmt -> execute();

  if(!$result){
    $json = array(
      "ok" => false,
      "message" => $conn -> error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt -> get_result();
  $discussions = array();
  while($row = $result -> fetch_assoc()){
    array_push($discussions, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );

  $response = json_encode($json);
  echo $response;

?>