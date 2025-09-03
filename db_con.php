<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "guren";

$conn = mysqli_connect($servername, $username, $password, $dbname, 3306);

if(!$conn){
    die("Connection failed " . mysqli_connect_error());
}

echo "Connected successfully";

?>
