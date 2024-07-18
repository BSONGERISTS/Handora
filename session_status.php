<?php

session_start();
header('Content-Type: application/json');

$response = [
    'logged_in' => isset($_SESSION['logged_in']) && $_SESSION['logged_in'],
];

if ($response['logged_in']) {
    $response['username'] = $_SESSION['username'];
    $response['email'] = $_SESSION['email'];
}

echo json_encode($response);

?>
