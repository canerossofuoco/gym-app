<?php

    function verify_cookie($cookie_id,$cookie_email) {
        $query = "select * from cookie where id=$cookie_id and email_utente='".$cookie_email."';";
        $conn = new mysqli("localhost","root","","gym_app");
        if($conn->connect_error) 
            $risposta = array("messaggio" => "Connection Failed");
        else
            $risposta = array("messaggio" => "Connected succesfully");
        $result = $conn->query($query);
        if($result->num_rows>1 || $result->num_rows==1)
           return true;
        else 
            return false;
    }

?>