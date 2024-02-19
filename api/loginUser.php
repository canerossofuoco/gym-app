<?php
    $email = $POST["email"];
    $password = $POST["password"];
    $conn = new mysqli("localhost","root","","gym-app");
    if($conn->connect_error) 
        $risposta = array("messaggio" => "Connection Failed");
    else
    {
        $risposta = array("messaggio" => "Connected succesfully"); 
    }
    $query = "select * from utenti where email='$email' and password='$password'";
    $result = $conn->query($query);
    if($result->num_rows==1) {
        $row = $result->fetch_assoc();
        $rand = rand(1000,9999);
        $query = "insert into cookie values($rand,'".$row["email"]."'])";
        if($conn->query($query)) {
            $risposta["login"] = true;
        }
    }else { 
        $risposta["login"] = false;
    }
    echo json_encode($risposta);
?>