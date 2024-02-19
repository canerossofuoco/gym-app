<?php
    require("functions.inc");
    $array = verify_cookie($POST["cookie"]);
    if($array["login"]) {
        $result = $query = "select * from dati_kcal where email='".$array["email"]."";
        if($result->num_rows==1) {
            $row = $result->fetch_assoc();
            $risposta["dati_kcal"] = $row;
        }
    }else {
        $risposta["login"] = false;
    }
    echo json_encode($risposta);
?>