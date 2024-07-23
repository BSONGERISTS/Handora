<?php
include('db_connection.php');
session_start();

$response = array();

if (!isset($_SESSION['user_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Not logged in';
    echo json_encode($response);
    exit;
}

$user_id = $_SESSION['user_id'];
$current_password = $_POST['current_password'];
$new_password = $_POST['new_password'];

// Fetch the user's current password hash from the database
$query = "SELECT password FROM Users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($password_hash);
$stmt->fetch();
$stmt->close();

// Verify the current password
if (!password_verify($current_password, $password_hash)) {
    $response['status'] = 'error';
    $response['message'] = 'Current password is incorrect';
    echo json_encode($response);
    exit;
}

// Hash the new password
$new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);

// Update the password in the database
$query = "UPDATE Users SET password = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $new_password_hash, $user_id);

if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update password';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
