<?php 
  require_once('conn.php');
  header('Content-type:application/json;chartset=utf8');
  header('Access-Control-Allow-Origin: *');

  $limit = 5;
  $id = $_GET['id'];

  $sql = 'SELECT * from discuss WHERE id < ? ORDER BY id DESC LIMIT ?';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('ii', $id, $limit);
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
    array_push($discussions , array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }


  $json = array(
    "ok" => true,
    "message" => 'success!',
    "discussions" => $discussions
  );

  $response = json_encode($json);
  echo $response;

?>