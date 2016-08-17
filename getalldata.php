<?php
  require_once("./utils.php");

  $con = connect_mysql();
  $str = select_all_and_echo("maindata", $con);
  mysql_close($con);

  $jsoned = json_encode($str);
  print_r($jsoned);
?>
