<?php

session_start();
header('Content-Type: application/json');

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reben_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// create an sql to get users 
$sql = "SELECT * FROM `users` WHERE id = ?";
// prepare the statement with sql
$stmt = $conn -> prepare ($sql);
// bind the session user id
$stmt -> bind_param ('i', $_SESSION['user_id']);
// execute the statement
$stmt->execute();
// get the result from execution
$result = $stmt -> get_result();
// get the value of result as variable $user
$user = $result -> fetch_assoc();

if ($user){
    $response = [
        'logged_in' => 1,
        'username' => $user['username'],
        'email' => $user['email']
    ];
    exit( json_encode($response) );
}
$response['logged_in'] = 0;
exit( json_encode($response) );

?>
