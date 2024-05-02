<?php
    require("functions.inc");
    $routes = array(
        '/add/Food' => 'addFood',
        '/loginUser' => 'loginUser',
        '/request/Calories' => 'requestCalories',
        '/add/workout' => 'addWorkout',
        '/add/exercise' => 'addExercise',
        '/add/exercise/workout' => 'addExerciseToWorkout',
        '/request/profile' => 'requestProfile',
        '/request/workout' => 'requestWorkout',
        '/modify/exercise' => 'modifyExercise',
        '/request/exercises' => 'requestExercises',
        '/request/exercise/sets' => 'getExerciseSets',
        '/add/exercise/set' => 'insertExerciseSet'
    );

    $url =  $_SERVER['PHP_SELF'];
    $url = substr($url,10);
    global $conn;
    $conn = new mysqli("localhost","root","","gym_app");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    // if($conn->connect_error) 
    //     echo "Connection failed";
    // else
    //     echo "Connected Succeffully";
    
    if(array_key_exists($url,$routes)) {
        $functionName = $routes[$url];
        call_user_func($functionName);
    } else 
        echo "pagina non trovata";

    function addFood() { //works
        global $conn;
        $res = array("array risposta" => "addFood");
        $carbo = $_POST["carboidrati"];
        $proteine = $_POST["proteine"];
        $grassi = $_POST["grassi"];
        $calorie = $_POST["calorie"];

        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"]= true;
            $email = $_POST["cookie_email"];
            $query = "select * from dati_kcal where email_utente='$email' and giorno=curdate();";
            $result_query = $conn->query($query);
            if($result_query->num_rows==1)
                $query= "update dati_kcal set calorie = calorie+$calorie, gCarboidrati= gCarboidrati+ $carbo, gProteine= gProteine+ $proteine , gGrassi= gGrassi+ $grassi where giorno= curdate() and email_utente='$email';";
            else 
                $query = "insert into dati_kcal (calorie,gCarboidrati,gProteine,gGrassi,email_utente,giorno) values($calorie,$carbo,$proteine,$grassi,'$email',curdate());";
            
            echo $query;
            $result_query = $conn->query($query);
            if($result_query)
                $res["insert"] = true;
            else 
                $res["insert"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);

    }

    function loginUser() { //works
        global $conn;
        $res = array("array risposta" => "loginUser");
        $email = $_POST["email"];
        $password = $_POST["password"];

        if(isset($_POST["cookie_id"],$_POST["cookie_email"]) && $_POST["cookie_id"]!=null && $_POST["cookie_email"]!=null) {
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
                    $res["cookie_id"] = $rand;
                    $res["cookie_email"] = $emailCookie;
                }
            }else { 
                $res["login"] = false;
            }
        }
        echo json_encode($res);

    }

    function requestCalories() { //works
        global $conn;
        $res = array("array risposta" => "requestCalories");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $query = "select * from dati_kcal where email_utente='".$_POST["cookie_email"]."' and giorno = curdate()";
            $result_query = $conn->query($query); 
            if($result_query->num_rows==1) {
                $row = $result_query->fetch_assoc();
                $res["dati_kcal"] = $row;
            }
        }else {
            $res["login"] = false;
        }
        echo json_encode($res);

    }

    function addWorkout() {  //works
        global $conn;
        $res = array("array risposta" => "addWorkout");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $query = "insert into workouts (nome,email_utente) values('$nome','$email');";
            $res_query = $conn->query($query);
            if($res_query)
                $res["inserimento"] = true;
            else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);

    }

    function addExercise() { //works
        global $conn;
        $res = array("array risposta" => "addExercise");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $query = "insert into esercizi (nome,email_utente) values('$nome','$email');";
            $result_query = $conn->query($query);
            if($result_query)
                $res["inserimento"] = true;
            else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }

    function addExerciseToWorkout() { //works

        $idw = -1;
        $ide = -1;
        global $conn;
        $res = array("array risposta" => "addExerciseToWorkout");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $nome = $_POST["nome"];
            $email = $_POST["cookie_email"];
            $nome_esercizio = $_POST["nome_esercizio"];

            $query = "select * from workouts where nome='$nome' and email_utente='$email';";  //seleziono id workout
            
            $res_query = $conn->query($query);
            if($res_query->num_rows==1) {
                $row = $res_query->fetch_assoc();
                $idw = $row["id"];
            }

            $query = "select * from esercizi where nome='$nome_esercizio' and email_utente='$email';"; //seleziono id esercizio
            
            $res_query = $conn->query($query);
            if($res_query->num_rows==1) {
                $row = $res_query->fetch_assoc();
                $ide = $row["id"];
            }
            
            $query = "insert into esercizi_workouts values($idw,$ide);"; //inserimento associazione workout-esercizio
            
            $res_query = $conn->query($query);
            if($res_query)
                $res["inserimento"]  = true;
            else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }

    function requestProfile() {  //works
        global $conn;
        $res = array("array risposta" => "requestProfile"); 
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $query = "select * from utenti where email = '$email';";
            $result_query = $conn->query($query);
            if($result_query->num_rows==1) {
                $row = $result_query->fetch_assoc();
                $res["nome"] = $row["nome"];
                $res["cognome"] = $row["cognome"];
                $res["eta"] = $row["eta"];
                $res["peso"] = $row["peso"];
                $res["peso"] = $row["peso"];
                $res["inserimento"] = true;
            }else
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }
    
    function requestWorkout() {
        global $conn;
        $response = array("array risposta" => "requestWorkout");
    
        if (verify_cookie($_POST["cookie_id"], $_POST["cookie_email"])) {
            $response["login"] = true;
            $response["workouts"] = array(); // Array per i workouts
    
            $email = $_POST["cookie_email"];
            $query = "SELECT * FROM workouts WHERE email_utente='$email';";
            $result_query = $conn->query($query);
    
            if ($result_query->num_rows > 0) {
                while ($row = $result_query->fetch_assoc()) {
                    // Aggiungi il workout al array di workouts
                    $response["workouts"][] = $row;
                }
            }
        } else {
            $response["login"] = false;
        }
    
        // Codifica l'intera risposta in JSON e stampa
        echo json_encode($response);
    }
    

    function modifyExercise() {  //works
        global $conn;
        $res = array("array risposta" => "modifyExercise");
        if(verify_cookie($_POST["cookie_id"],$_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nome = $_POST["nome_esercizio"];
            $peso = $_POST["peso"];
            $query = "select * from esercizi where email_utente='$email' and nome='$nome';";
            $result_query = $conn->query($query);
            if($result_query->num_rows==1) {
                $query = "update esercizi set peso='$peso' where email_utente='$email' and nome='$nome';";
                $result_query = $conn->query($query);
                if($result_query) 
                    $res["inserimento"] = true;
                else 
                    $res["inserimento"] = false;
            }else 
                $res["inserimento"] = false;
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }

    function requestExercises() {
        global $conn;
        $res = array("array risposta" => "requestExercises");
        
        if (verify_cookie($_POST["cookie_id"], $_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nomeWorkout = $_POST["nome_workout"]; 
            
            $query = "SELECT e.* 
            FROM esercizi e
            INNER JOIN esercizi_workouts ew ON e.id = ew.id_esercizio
            INNER JOIN workouts w ON ew.id_workout = w.id
            WHERE w.nome = '$nomeWorkout' AND w.email_utente = '$email';";
            $result_query = $conn->query($query);
            
            if ($result_query->num_rows > 0) {
                $exercises = array();

                while ($row = $result_query->fetch_assoc()) {
                    $exercise = array(
                        "id" => $row["id"],
                        "nome" => $row["nome"],
                        "email_utente" => $row["email_utente"],
                    );
                    $exercises[] = $exercise;
                }
    
                $res["exercises"] = $exercises;
            } else {
                $res["exercises"] = "null";
            }
        } else {
            $res["login"] = false;
        }
        
        echo json_encode($res);
    }

    function insertExerciseSet() {
        global $conn;
        $res = array("array risposta" => "insertExerciseSet");
    
        
        if (verify_cookie($_POST["cookie_id"], $_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nomeEsercizio = $_POST["nome_esercizio"];
            $numSet = $_POST["num_set"];
            $peso = $_POST["peso"];
    
            $queryCheckEsercizio = "SELECT id FROM esercizi WHERE nome = '$nomeEsercizio' AND email_utente = '$email';";
            $resultCheckEsercizio = $conn->query($queryCheckEsercizio);
    
            if ($resultCheckEsercizio->num_rows > 0) {
                $rowEsercizio = $resultCheckEsercizio->fetch_assoc();
                $idEsercizio = $rowEsercizio["id"];

                $queryInsertSet = "INSERT INTO sets (num_set, nome_esercizio, email_utente, peso)
                                   VALUES ($numSet, '$nomeEsercizio', '$email', $peso);";
    
                if ($conn->query($queryInsertSet) === TRUE) {
                    $res["inserimento"] = true;
                } else {
                    $res["inserimento"] = false;
                }
            } else {
                $res["esercizio_non_trovato"] = true;
            }
        } else {
            $res["login"] = false;
        }
    
        echo json_encode($res);
    }


    function getExerciseSets() { //
        global $conn;
        $res = array("array risposta" => "getExerciseSets");
    
        // Verifica cookie per autenticazione
        //if (verify_cookie($_POST["cookie_id"], $_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nomeEsercizi = str_getcsv($_POST["nome_esercizio"]);
        
            // Costruisci la parte della query per la clausola IN con tutti gli esercizi specificati
            $eserciziCondizione = implode(', ', array_map(function($nome) {
                return "'$nome'";
            }, $nomeEsercizi));
        
            // Query per ottenere tutti i set di esercizi specificati per un utente
            $queryGetSets = "SELECT nome_esercizio, num_set, peso
                             FROM setss
                             WHERE nome_esercizio IN ($eserciziCondizione) AND email_utente = '$email'
                             ORDER BY nome_esercizio, num_set ASC;";
            $resultGetSets = $conn->query($queryGetSets);
            $res["array"] = array();    
            if($resultGetSets->num_rows>0) {
                while($row = $resultGetSets->fetch_assoc()) {
                    array_push($res["array"],$row);
                }
            }
            //$res["array"] = $resultGetSets;
        // } else {
        //     $res["login"] = false;
        // }
    
        echo json_encode($res);
    }
      
?>