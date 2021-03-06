<?php 
  function escape($str){
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getUserFromUserName($username){
    global $conn;
    $sql = sprintf("SELECT * FROM hazel_users WHERE username='%s'",
    $username);
    $result = $conn -> query($sql);
    $row = $result -> fetch_assoc();
    return $row;
  }

  function identityAuthentication($username){
    global $conn;
    $sql = "SELECT identity FROM hazel_users WHERE username = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> bind_param('s', $username);
    $result = $stmt -> execute();
    if(!$result){
      die($conn -> error);
    }
    $result = $stmt -> get_result();
    $row = $result -> fetch_assoc();
    
    $identity = $row['identity'];
    if($identity === 'admin'){
      $_SESSION['identity'] = 'admin';
    } else if($identity === '停權使用者'){
      $_SESSION['identity'] = 'banned';
    } else {
      $_SESSION['identity'] = 'normal';
    }
  }

  function alert($msg, $redirect) {
    echo '<script language="JavaScript">;alert("' . $msg . '");location.href="' . $redirect . '";</script>;';
  }

?>