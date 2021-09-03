<?php
$path = $_GET['path'];
echo("data:".$_GET['type'].";base64,".base64_encode(file_get_contents($_GET['path'])));
?>