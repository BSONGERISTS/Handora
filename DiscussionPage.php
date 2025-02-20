<?php
$mysqli = require_once './db_connection.php';

$sql = "SELECT users.username, users.profile_picture, games.name AS gameName, discussions.title, discussions.content, discussions.publishDate FROM `discussions`, `users`, `games` WHERE discussions.users_id = users.ID AND games.id = discussions.games_id AND discussions.id = ?;";
$stmt = $mysqli -> prepare ($sql);
$stmt->bind_param('i', $_GET['discussionID']);
$stmt -> execute();
$result = $stmt->get_result();
$discussion = $result -> fetch_assoc();

$response = [
    'status' => "success",
    'message' => "Got the discussion from the id",
    'discussion' => $discussion
];

if (!$discussion){
    $response = [
        'status' => "error",
        'message' => "No data"
    ];
}

exit ( json_encode($response) );
?>