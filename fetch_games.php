<?php
require 'db_connection.php';

$keyword = $_GET['keyword'];
$keyword = '%' . $keyword . '%';

$sql = "SELECT name FROM games WHERE name LIKE ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $keyword);
$stmt->execute();
$result = $stmt->get_result();

$games = [];
while ($row = $result->fetch_assoc()) {
    $games[] = $row['name'];
}

echo json_encode($games);
?>
