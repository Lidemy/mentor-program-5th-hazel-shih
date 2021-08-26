<?php 
  require_once('conn.php');
  header('Access-Control-Allow-Origin: *');
  header('Content-type:application/json;chartset=utf8');

  if(empty($_POST['todosData'])){
    $arr = array(
      'ok' => false,
      'message' => '沒有收到 todos 內容'
    );
    $json = json_encode($arr);
    echo $json;
    die();
  }

  function createTodosID() {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < 10; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }

  $content = $_POST['todosData'];
  $todos_ID = createTodosID();

  $sql = 'INSERT INTO `hazel_w12_todoList`(`content`,todos_id) VALUES (?, ?)';
  $stmt = $conn -> prepare($sql);
  $stmt -> bind_param('ss', $content, $todos_ID);
  $result = $stmt -> execute();

  if(!$result){
    $arr = array(
      "ok" => false,
      "message" => $conn -> error
    );
    $json = json_encode($arr);
    echo $json;
    die();
  }

  $arr = array(
    "ok" => true,
    "message" => 'success',
    "todosID" => $todos_ID,
  );
  $json = json_encode($arr);
  echo $json;

?>