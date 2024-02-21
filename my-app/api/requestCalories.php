<?php
    require("functions.inc");
    $conn = new mysqli("localhost","root","","gym_app");
    if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
        $query = "select * from dati_kcal where email_utente='".$_POST["cookie_email"]."'";
        $result_query = $conn->query($query); 
        if($result_query->num_rows==1) {
            $row = $result->fetch_assoc();
            $res["dati_kcal"] = $row;
        }
    }else {
        $res["login"] = false;
    }
    echo json_encode($res);
?>