<?php
  require_once("./utils.php");

  $datachar = null;
  if(!empty($_POST["datachar"])){
      $datachar = $_POST["datachar"];
  }

  if($datachar !== '' || $datachar !== null) {
      $con = connect_mysql();
      $newid = insert_into("maindata", $datachar, $con);
      mysql_close($con);
      echo $newid;
  } else {
      http_response_code(400);
      echo "error";
  }
?>
