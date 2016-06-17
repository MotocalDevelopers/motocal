<?php
  require_once("./utils.php");

  $id = null;
  if(!empty($_POST["id"])){
      $id = $_POST["id"];
  }

  $con = connect_mysql();
  $datachar = select_by_id("maindata", $id, $con);
  update_lastaccessed("maindata", $id, $con);
  mysql_close($con);

  echo $datachar["datachar"];
?>
