<?php 
    require("functions.inc");
    $array = verify_cookie($POST["cookie"]);
    $carbo = $POST["carboidrati"];
    $proteine = $POST["proteine"];
    $grassi = $POST["grassi"];
    if($array["login"]) {
        $risposta = array("login" => true);
        $email = $array["email"];
        $conn = new mysqli("localhost","root","","gym-app");
        $query= "insert into dati_kcal values($carbo,$proteine,$grassi,$email)";
        $result = $conn->query($query);
        if($result)
            $risposta["inserimento"] = true;
        else 
            $risposta["inserimento"] = false;
    }else 
        $risposta["login"] = false;
    echo json_encode($risposta);
?>