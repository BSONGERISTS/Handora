<?php
session_start();
header('Content-Type: application/json');

$response = array();

if (isset($_SESSION['user_id'])) {
    require 'db_connection.php';
    
    $userId = $_SESSION['user_id'];
    $query = "SELECT username, email, profile_picture FROM users WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        $response['logged_in'] = true;
        $response['username'] = $user['username'];
        $response['email'] = $user['email'];
        $response['profile_picture'] = $user['profile_picture'];
    } else {
        $response['logged_in'] = false;
    }
} else {
    $response['logged_in'] = false;
}

echo json_encode($response);
?>
