<?php

    function verify_cookie($cookie) {
        $email = "";
        $cookie = $POST["cookie"];
        $query = "select * from cookie where id=$cookie";
        $conn = new mysqli("localhost","root","","gym-app");
        if($conn->connect_error) 
            $risposta = array("messaggio" => "Connection Failed");
        else
            $risposta = array("messaggio" => "Connected succesfully");
        $result = $conn->query($query);
        if($result->num_rows==1) {
            $row = $result->fetch_assoc();
            $email = $row["email"];
            $risposta["login"] = true;
            $risposta["email"] = $email;
        } else {
            $risposta["login"] = false;
        }
        return $risposta;
    }

?>