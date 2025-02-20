<?php
header('Content-Type: application/json; charset=utf-8');

$mysqli = require_once './db_connection.php';

$game_title = $_POST['game_title'];

$sql_game = "SELECT * FROM `games` WHERE name = ?";

$stmt = $mysqli -> prepare ($sql_game);

$stmt -> bind_param ('s', $game_title);

$stmt -> execute();

$result = $stmt -> get_result();

$game = $result -> fetch_assoc();

if (!$game) {
    $response = [
        'status' => "error",
        'message' => "There is no such game as of now"
    ];
    exit ( json_encode($response));
}

session_start();
$user_id = $_SESSION['user_id'];
$guide_title = $_POST['guide_title'];
$guide_description = $_POST['guide_description'];
$guide_contents = $_POST['guide_contents'];

// PUT THE IMAGE PATH INSIDE THIS SQL GUIDE===================================================================================================
$pathinfo = pathinfo($_FILES['guide_thumbnail']['name']);
$base = $pathinfo['filename'];
$base = preg_replace("/[^\w-]/", "_", $base);
$filename = $base . "." . $pathinfo['extension'];
$destination = "./uploads/guide_pictures/". $filename;
$i = 1;
while (file_exists($destination)){
    $filename = $base . "($i)." . $pathinfo['extension'];
    $destination = "./uploads/guide_pictures/". $filename;
    $i++;
}
move_uploaded_file($_FILES['guide_thumbnail']['tmp_name'], $destination);
// PUT THE IMAGE PATH INSIDE THIS SQL GUIDE===================================================================================================

$sql_guide = "INSERT INTO `guides`(`users_id`, `games_id`, `title`, `description`, `content`, `image`) VALUES (?, ?, ?, ?, ?, ?);";

$stmt = $mysqli -> prepare ($sql_guide);

$stmt -> bind_param ('iissss', $user_id, $game['id'], $guide_title, $guide_description, $guide_contents, $filename);

$stmt -> execute();

$response = [
    'status' => "success",
    'message' => "The data are passed"
];

exit ( json_encode($response) );

?>