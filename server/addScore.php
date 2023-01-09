<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sci_smash";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
if($_GET["user"] && $_GET["score"] && is_numeric($_GET["score"]) && ctype_alpha($_GET["user"])){
    $properUser = strtoupper(substr($_GET["user"],0,3));
    
    $sqlquery = "INSERT INTO `scores` (`score`, `username`) VALUES ('".$_GET["score"]."', '".$properUser."');";
    if ($conn->query($sqlquery) === TRUE) {
        echo "record inserted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}else{
    echo "Error: Improper data";
}
$conn->close();
?>