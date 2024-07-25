<?php
session_start();
include('db_connection.php'); // Make sure you have the database connection file included

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['input_username'];
    $email = $_POST['input_email'];
    $userId = $_SESSION['user_id'];

    // Debugging: Check if variables are set correctly
    error_log("Username: $username, Email: $email, UserID: $userId");

    // Update query
    $query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    $stmt = $conn->prepare($query);

    // Debugging: Check if the statement preparation is successful
    if (!$stmt) {
        error_log("Statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("ssi", $username, $email, $userId);

    if ($stmt->execute()) {
        // Update session variables
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        
        $response['status'] = 'success';
        $response['message'] = 'Profile updated successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Failed to update profile: ' . $stmt->error;
        // Debugging: Log the SQL error
        error_log("SQL error: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid request';
}

echo json_encode($response);
?>
