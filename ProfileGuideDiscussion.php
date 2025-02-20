<?php
session_start();
$mysqli = require_once './db_connection.php';

$sql_guides = "SELECT guides.id, guides.title, games.name AS gameName, users.username, guides.description, guides.content, guides.image FROM `guides`, `users`, `games` WHERE users.ID = guides.users_id AND games.id = guides.games_id AND users.ID = ?;";
$stmt = $mysqli -> prepare ($sql_guides);
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt -> execute();
$result = $stmt->get_result();
$guides = $result -> fetch_all( MYSQLI_ASSOC );

$sql_discussions = "SELECT discussions.id, discussions.title, games.name AS gameName, discussions.publishDate FROM `discussions`, `users`, `games` WHERE users.ID = discussions.users_id AND games.id = discussions.games_id AND users.ID = ?;";
$stmt = $mysqli -> prepare ($sql_discussions);
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt -> execute();
$result = $stmt->get_result();
$discussions = $result -> fetch_all( MYSQLI_ASSOC );

$response = [
    'status' => "success",
    'message' => "got all the guides made by the user",
    'guides' => $guides,
    'discussions' => $discussions
];

exit ( json_encode($response) );
?>