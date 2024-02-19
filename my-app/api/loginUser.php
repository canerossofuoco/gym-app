<?php
    $email = $_POST["email"];
    $password = $_POST["password"];
    $conn = new mysqli("localhost","root","","gym_app");
    if($conn->connect_error) 
        $risposta = array("messaggio" => "Connection Failed");
    else
    {
        $risposta = array("messaggio" => "Connected succesfully"); 
    }
    $query = "select * from utenti where email='$email' and psw='$password'";
    $risposta["query"] = $query;
    $result = $conn->query($query);
    if($result->num_rows==1) {
        $row = $result->fetch_assoc();
        $rand = rand(1000,9999);
        $query = "insert into cookie values($rand,'".$row["email"]."');";
        $idCookie = $rand;
        $emailCookie = $row["email"];
        if($conn->query($query)) {
            $risposta["login"] = true;
            $risposta["idCookie"] = $rand;
            $risposta["emailCookie"] = $emailCookie;
        }
    }else { 
        $risposta["login"] = false;
    }
    echo json_encode($risposta);
?>