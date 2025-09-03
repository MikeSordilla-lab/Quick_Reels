<?php
session_start();
require 'db_con.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($userId, $hashedPassword);
        $stmt->fetch();

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $userId;
            $_SESSION['username'] = $username;
            header("Location: welcome.php");
            exit;
        } else {
            header("Location: index.php");
            exit;
        }
    } else {
        echo "User not found. <a href='index.php'>Try again</a>";
    }

    $stmt->close();
    $conn->close();
}
?>
