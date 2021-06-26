<?php
  function generateToken(){
    $str = '';
    for($i = 1; $i <= 16; $i++){
      $str .= chr(rand(65, 90));
    }
    return $str;
  }
?>


