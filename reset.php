<?php
// Start the session
session_start();

// Destroy each data in session
session_unset();

// Destroy the session itself
session_destroy();

// Check if session 'id' exists
if (isset($_SESSION['id'])) {
    echo $_SESSION['id'];
} else {
    echo "no session";
}
?>
