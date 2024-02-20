<?php
    require("functions.inc");

    $res = array("array risposta" => "loginUser");
    $email = $_POST["email"];
    $password = $_POST["password"];

    if(isset($_POST["cookie_id"],$_POST["cookie_email"])) {
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
        }
    } else {
        $conn = new mysqli("localhost","root","","gym_app");
        if($conn->connect_error) 
            $res["message"] = "Connection failed";
        else
            $res["message"] = "Connected Succeffully";
        $query = "select * from utenti where email='$email' and psw='$password'";
        $result_query = $conn->query($query);
        if($result_query->num_rows==1) {
            $row = $result_query->fetch_assoc();
            $rand = rand(1000,9999);
            $query = "insert into cookie values($rand,'".$row["email"]."');";
            $idCookie = $rand;
            $emailCookie = $row["email"];
            if($conn->query($query)) {
                $res["login"] = true;
                $res["idCookie"] = $rand;
                $res["emailCookie"] = $emailCookie;
            }
        }else { 
            $risposta["login"] = false;
        }
    }
    echo json_encode($res);
?>