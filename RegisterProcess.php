<?php



// get values from submit
$username = $_POST['Input-Username'];
$email = $_POST['Input-Email'];
$password = $_POST['Input-Password'];
$password2 = $_POST['Input-Password-2'];

 
if ($password != $password2){
    $response = [
        'status' => 'error',
        'message' => 'password does not match'
    ];

    // exit and return response   
    exit (json_encode($response));
}

$password =password_hash($_POST ['input-password'], PASSWORD_BCRYPT);

$sql = "INSERT INTO `Accounts`(`Username`, `Email`, `Password`) VALUES ('". $username ."','". $email ."','". $password ."')";


$response = [
        'status' => 'sucessful',
        'message' => 'password match'
    ];

// exit and return response   
exit (json_encode($response));




?>