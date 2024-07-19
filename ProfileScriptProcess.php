<?php

session_start();
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reben_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

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

    // get all the inputs from the ProfileHandora.html
    $username = $_POST['input_username'];
    $email = $_POST['input_email'];
    $hashed_password = password_hash($_POST['input_password'], PASSWORD_DEFAULT);

    if (empty($_POST['input_password'])){

        try{
            // create an sql to update a logged in user
            $sql = "UPDATE `users` SET `username`= ?,`email`= ? WHERE ID = ?;";
            // prepare the statement with sql
            $stmt = $conn -> prepare ($sql);
            // bind the all the values
            $stmt -> bind_param ('ssi', $username, $email, $_SESSION['user_id']);
            // execute the statement
            $stmt->execute();
    
            $response = [
                'status' => "success",
                'message' => "Data updated successfully"
            ];
        }
        // if there is error in query
        catch (Exception $e){
            // make an error response
            $response = [
                'status' => "error",
                'message' => "Error No: ". $e->getCode() ." - ". $e->getMessage()    // get error code and message
            ];
        }
    
    }
    else{
        try{
            // create an sql to update a logged in user
            $sql = "UPDATE `users` SET `username`= ?,`email`= ?,`password`= ? WHERE ID = ?;";
            // prepare the statement with sql
            $stmt = $conn -> prepare ($sql);
            // bind the all the values
            $stmt -> bind_param ('sssi', $username, $email, $hashed_password, $_SESSION['user_id']);
            // execute the statement
            $stmt->execute();
    
            $response = [
                'status' => "success",
                'message' => "Data updated successfully"
            ];
        }
        // if there is error in query
        catch (Exception $e){
            // make an error signup response
            $response = [
                'status' => "error",
                'message' => "Error No: ". $e->getCode() ." - ". $e->getMessage()    // get error code and message
            ];
        }
    }
    

    exit ( json_encode($response) );
}

$response = [
    'status' => "error",
    'message' => "NOT A POST METHOD"
];

exit ( json_encode($response) );


?>