<?php
session_start();
include('db_connection.php'); // Make sure you have the database connection file included

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['croppedImage'])) {
        // Handle profile picture update
        $image = $_FILES['croppedImage']['tmp_name'];
        $imgContent = addslashes(file_get_contents($image));

        $userId = $_SESSION['user_id'];

        $imagePath = 'uploads/profile_pictures/' . $userId . '.png'; // Store with user ID

        // Ensure the directory exists
        if (!file_exists('uploads/profile_pictures')) {
            mkdir('uploads/profile_pictures', 0777, true);
        }

        // Move the uploaded file
        if (move_uploaded_file($_FILES['croppedImage']['tmp_name'], $imagePath)) {
            // Update the database
            $query = "UPDATE users SET profile_picture = ? WHERE id = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                error_log("Statement preparation failed: " . $conn->error);
                $response['status'] = 'error';
                $response['message'] = 'Failed to update profile picture: ' . $conn->error;
            } else {
                $stmt->bind_param("si", $imagePath, $userId);

                if ($stmt->execute()) {
                    $response['status'] = 'success';
                    $response['message'] = 'Profile picture updated successfully';
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'Failed to update profile picture: ' . $stmt->error;
                    error_log("SQL error: " . $stmt->error);
                }

                $stmt->close();
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Failed to upload image';
        }
    } else {
        // Handle other profile updates (e.g., username and email)
        $username = $_POST['input_username'];
        $email = $_POST['input_email'];
        $userId = $_SESSION['user_id'];

        error_log("Username: $username, Email: $email, UserID: $userId");

        $query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            error_log("Statement preparation failed: " . $conn->error);
            $response['status'] = 'error';
            $response['message'] = 'Failed to update profile: ' . $conn->error;
        } else {
            $stmt->bind_param("ssi", $username, $email, $userId);

            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Profile updated successfully';
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Failed to update profile: ' . $stmt->error;
                error_log("SQL error: " . $stmt->error);
            }

            $stmt->close();
        }
    }
}

echo json_encode($response);
?>
