<?php

$server = "localhost";
$username = "root";
$password = "";
$database = "beatwave";

// Establishing Connection!
$conn = mysqli_connect($server, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetching Record From HTML
$name = $_POST['name'];
$email = $_POST['email'];
$username = $_POST['uname'];
$password = $_POST['password'];

//Inserting Data into database
$sql = "INSERT INTO `register` (`name`, `email`, `username`, `password`) VALUES ('$name', '$email', '$username', '$password');";
$result = mysqli_query($conn, $sql);

if ($result === TRUE) {
    echo $name;
    echo $email;
    echo $username;
    echo $password;

} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>