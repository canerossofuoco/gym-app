<?php
    require("functions.inc");
    $routes = array(
        '/addFood' => 'addFood',
        '/loginUser' => 'loginUser',
        '/request/Calories' => 'requestCalories',
        '/add/workout' => 'addWorkout',
        '/add/exercise' => 'addExercise',
        '/add/exercise/workout' => 'addExerciseToWorkout',
        '/request/profile' => 'requestProfile',
        '/request/workout' => 'requestWorkout',
        '/modify/exercise' => 'modifyExercise'
    );

    $url =  $_SERVER['PHP_SELF'];
    $url = substr($url,10);
    $conn = new mysqli("localhost","root","","gym_app");
    if($conn->connect_error) 
        echo "Connection failed";
    else
        echo "Connected Succeffully";
    
    if(array_key_exists($url,$routes)) {
        $functionName = $routes[$url];
        call_user_func($functionName);
    } else 
        echo "Errore 404: Pagina non trovata";

    function addFood() {

        $res = array("array risposta" => "addFood");
        $carbo = $_POST["carboidrati"];
        $proteine = $_POST["proteine"];
        $grassi = $_POST["grassi"];
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"]= true;
            $email = $_POST["cookie_email"];
            $query= "update dati_kcal set gCarboidrati=$carbo, gProteine=$proteine , gGrassi=$grassi where email_utente='$email';";
            $result_query = $conn->query($query);
            if($result_query)
                $res["insert"] = true;
            else 
                $res["insert"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);

    }

    function loginUser() {

        $res = array("array risposta" => "loginUser");
        $email = $_POST["email"];
        $password = $_POST["password"];

        if(isset($_POST["cookie_id"],$_POST["cookie_email"])) {
            if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
                $res["login"] = true;
            }
        } else {
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
                $res["login"] = false;
            }
        }
        echo json_encode($res);

    }

    function requestCalories() {

        $res = array("array risposta" => "requestCalories");
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

    }

    function addWorkout() {
        
        $res = array("array risposta" => "addWorkout");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $query = "insert into workouts values('$nome','$email');";
            $res_query = $conn->query($query);
            if($res_query)
                $res["inserimento"] = true;
            else 
                $res["inserimento"] = false;
        }
        echo json_encode($res);

    }

    function addExercise() {
        $res = array("array risposta" => "addExerciset");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $query = "insert into esercizi values('$nome','$email','');";
            $result_query = $conn->query($query);
            if($result_query)
                $res["inserimento"] = true;
            else 
                $res["inserimento"] = false;
            echo json_encode($res);
        }
    }

    function addExerciseToWorkout() {

        $idw = -1;
        $ide = -1;
        
        $res = array("array risposta" => "addExerciseToWorkout");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $nome_esercizio = $_POST["nome_esercizio"];

            $query = "select * from workouts where nome='$nome' and email_utente='$email';";  //seleziono id workout
            $res_query = $conn->query($query);
            if($result_query->num_rows==1) {
                $row = $result->fetch_assoc();
                $idw = $row["id"];
            }

            $query = "select * from esercizi where nome='$nome_esercizio' and email_utente='$email';"; //seleziono id esercizio
            $res_query = $conn->query($query);
            if($result_query->num_rows==1) {
                $row = $result->fetch_assoc();
                $ide = $row["id"];
            }
            
            $query "insert into esercizi_workouts values($idw,$ide);"; //inserimento associazione workout-esercizio
            $res_query = $conn->query($query);
            if($result_query)
                $res["inserimento"]  = true;
            else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }

    function requestProfile() {
        $res = array("array risposta" => "requestProfile"); 
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $query = "select * from utenti where email = '$email';";
            $result_query = $conn->query($query);
            if($result_query->num_rows==1) {
                $row = $result->fetch_assoc();
                $res["nome"] = $row["nome"];
                $res["cognome"] = $row["cognome"];
                $res["eta"] = $row["eta"];
                $res["peso"] = $row["peso"];
                $res["stringa_peso"] = $row["stringa_peso"];
                $res["inserimento"] = true;
            }else
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }
    
    function requestWorkout() {
        $res = array("array risposta" => "requestWorkout");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $query = "select * from workouts where email_utente='$email';";
            $result_query = $conn->query($query);
            if($result_query->num_rows>0) {
                while($row=$result_query->fetch_assoc()) { //da verificare questa cosa
                    $res["workouts"].=$row;
                }
            }else 
                $res["workouts"] = "";
        }else 
            $res["login"] = false;
        echo json_encode($res); 
    }

    function modifyExercise() {
        
        $res = array("array risposta" => "modifyExercise");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nome = $_POST["nome_esercizio"];
            $peso = $_POST["stringa_peso"];
            $query = "update esercizi set stringa_peso='$peso' where email_utente='$email' and nome='$nome';";
            $result_query = $conn->query($query);
            if($result_query) 
                $res["inserimento"] = true;
            else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }

?>