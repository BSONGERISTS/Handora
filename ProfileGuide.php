<?php
session_start();
$mysqli = require_once './db_connection.php';

$sql = "SELECT guides.title, games.name AS gameName, users.username, guides.description, guides.content, guides.image FROM `guides`, `users`, `games` WHERE users.ID = guides.users_id AND games.id = guides.games_id AND users.ID = ?;";
$stmt = $mysqli -> prepare ($sql);
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt -> execute();
$result = $stmt->get_result();
$guides = $result -> fetch_all( MYSQLI_ASSOC );
$response = [
    'status' => "success",
    'message' => "got all the guides made by the user",
    'guides' => $guides
];

exit ( json_encode($response) );
?>