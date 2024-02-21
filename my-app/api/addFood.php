<?php 
    require("functions.inc");
    $carbo = $_POST["carboidrati"];
    $proteine = $_POST["proteine"];
    $grassi = $_POST["grassi"];
    if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
        $res = array("login" => true);
        $email = $_POST["cookie_email"];
        $conn = new mysqli("localhost","root","","gym_app");
        $query= "update dati_kcal set gCarboidrati=$carbo, gProteine=$proteine , gGrassi=$grassi where email_utente='$email';";
        $result_query = $conn->query($query);
        if($result_query)
            $res["insert"] = true;
        else 
            $res["insert"] = false;
    }else 
        $res["login"] = false;
    echo json_encode($res);
?>