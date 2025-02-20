<?php
$mysqli = require_once './db_connection.php';

$sql = "SELECT guides.title, games.name AS gameName, users.username, guides.description, guides.content, guides.image FROM `guides`, `users`, `games` WHERE users.ID = guides.users_id AND games.id = guides.games_id AND guides.id = ?;";
$stmt = $mysqli -> prepare ($sql);
$stmt->bind_param('i', $_GET['guideID']);
$stmt -> execute();
$result = $stmt->get_result();
$guide = $result -> fetch_assoc();

$response = [
    'status' => "success",
    'message' => "Got the Guide from the id",
    'guide' => $guide
];

if (!$guide){
    $response = [
        'status' => "error",
        'message' => "No data"
    ];
}

exit ( json_encode($response) );
?>