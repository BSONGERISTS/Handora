<?php

session_start();

$mysqli = require_once 'db_connection.php';

$gameName = $_POST['input_game'];

$sql_game = "SELECT id FROM `games` WHERE name = ?";
$stmt = $mysqli -> prepare ($sql_game);
$stmt -> bind_param ('s', $gameName);
$stmt -> execute();
$result = $stmt -> get_result();
$game_id = $result -> fetch_assoc();

if (!$game_id) {
    $response = [
        'status' => "error",
        'message' => "There are no such game"
    ];
    exit ( json_encode($response) );
}

$user_id = $_SESSION['user_id'];
$input_title = $_POST['input_title'];
$input_content = $_POST['input_content'];

$sql_discussion = "INSERT INTO `discussions`(`users_id`, `games_id`, `title`, `content`) VALUES (?, ?, ?, ?);";
$stmt = $mysqli -> prepare ($sql_discussion);
$stmt -> bind_param ('iiss', $user_id, $game_id, $input_title, $input_content);
$stmt -> execute();

$response = [
    'status' => "success",
    'message' => "Created the discussion successfully"
];

exit ( json_encode($response) );
?>