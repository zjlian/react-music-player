<?php
require_once("./query_kuwo_music.php");
header("Access-Control-Allow-Origin: *");

$name = $_GET["name"];


if(isset($name)) {
  echo json_encode(queryMusic($name), JSON_UNESCAPED_UNICODE);
}


