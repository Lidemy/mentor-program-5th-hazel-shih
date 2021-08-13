<?php 
  require_once('conn.php');
  header('Access-Control-Allow-Origin: *');
  header('Content-type:application/json;chartset=utf8');

  if(empty($_GET['todosID'])){
    $arr = array(
      'ok' => false,
      "message" => '沒有 todosID'
    );
    $json = json_encode($arr);
    echo $json;
    die();
  }

  $todos_ID = $_GET['todosID'];
  
  $sql = 'SELECT * FROM `hazel_w12_todoList` WHERE todos_id = ?';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('s', $todos_ID);
  $result = $stmt -> execute();

  if(!$result){
    $arr = array(
      "ok" => false,
      "message" => "Oops! There's an error here."
    );
    $json = json_encode($arr);
    echo $json;
    die();
  }

  $result = $stmt -> get_result();
  $todos = $result -> fetch_assoc();

  $arr = array(
    "ok" => true,
    "message" => "success!",
    "todos" => $todos
  );
  
  $json = json_encode($arr);
  echo $json;
?>