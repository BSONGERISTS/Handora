<?php
session_start();

$response = array();

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
    $response['logged_in'] = true;
    $response['username'] = $_SESSION['username'];
    $response['email'] = $_SESSION['email'];
} else {
    $response['logged_in'] = false;
}

echo json_encode($response);
?>
