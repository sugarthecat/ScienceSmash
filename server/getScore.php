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
$sql = "SELECT score_id, score, username FROM scores ORDER BY score desc";
$result = $conn->query($sql);
$currentRank = 1;
if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo $currentRank . ": " . $row["username"]. " - " . $row["score"]. "\n";
    $currentRank = $currentRank + 1;
  }
} else {
  echo "0 results";
}
$conn->close();
?>