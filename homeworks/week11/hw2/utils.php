<?php 
function escape($str){
  return htmlspecialchars($str, ENT_QUOTES);
}

function stripTags($str){
  return strip_tags($str);
}

?>

