<?php
    require("functions.inc");
    $array = verify_cookie($_POST["cookie"]);
    $conn = new mysqli("localhost","root","","gym_app");
    if($array["login"]) {
        $query = "select * from dati_kcal where email_utente='".$array["email"]."'";
        $result = $conn->query($query); 
        if($result->num_rows==1) {
            $row = $result->fetch_assoc();
            $risposta["dati_kcal"] = $row;
        }
    }else {
        $risposta["login"] = false;
    }
    echo json_encode($risposta);
?>