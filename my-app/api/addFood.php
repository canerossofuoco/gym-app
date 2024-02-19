<?php 
    require("functions.inc");
    $array = verify_cookie($_POST["cookie"]);
    $carbo = $_POST["carboidrati"];
    $proteine = $_POST["proteine"];
    $grassi = $_POST["grassi"];
    if($array["login"]) {
        $risposta = array("login" => true);
        $email = $array["email"];
        $conn = new mysqli("localhost","root","","gym_app");
        $query= "update dati_kcal set gCarboidrati=$carbo, gProteine=$proteine , gGrassi=$grassi where email_utente='$email';";
        $result = $conn->query($query);
        $risposta["query"] = $query;
        if($result)
            $risposta["inserimento"] = true;
        else 
            $risposta["inserimento"] = false;
    }else 
        $risposta["login"] = false;
    echo json_encode($risposta);
?>