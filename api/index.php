<?php
    require("functions.inc");
    $routes = array(
        '/add/Food' => 'addFood',
        '/loginUser' => 'loginUser',
        '/request/Calories' => 'requestCalories',
        '/add/exercises/workout' => 'addExercisesToWorkout',
        '/request/profile' => 'requestProfile',
        '/request/workout' => 'requestWorkout',
        '/modify/exercise' => 'modifyExercise',
        '/request/exercises' => 'requestExercises',
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

    function addExercisesToWorkout() {
        global $conn;
        $res = array("array risposta" => "addExerciseToWorkout");
    
        if (verify_cookie($_POST["cookie_id"], $_POST["cookie_email"])) {
            $res["login"] = true;
            $email = $_POST["cookie_email"];
            $nomeWorkout = $_POST["nomeWorkout"];
            $exerciseArray = $_POST["exerciseArray"];
    
            // Controllo se il workout esiste già, altrimenti lo creo
            $queryCheckWorkoutExist = "SELECT * FROM workouts WHERE nome = '$nomeWorkout' AND email_utente = '$email';";
            $resultQueryCheckWorkout = $conn->query($queryCheckWorkoutExist);
    
            if ($resultQueryCheckWorkout->num_rows == 0) {
                // Se il workout non esiste, lo inserisco
                $queryInsertWorkout = "INSERT INTO workouts (nome, email_utente) VALUES ('$nomeWorkout', '$email');";
                $resultInsertWorkout = $conn->query($queryInsertWorkout);
    
                if (!$resultInsertWorkout) {
                    $res["inserimentoWorkout"] = false;
                    echo json_encode($res);
                    return;
                }
            }
            $queryCheckWorkoutExist = "SELECT * FROM workouts WHERE nome = '$nomeWorkout' AND email_utente = '$email';";
            $result3 = $conn->query($queryCheckWorkoutExist);
            // Ottengo l'ID del workout
            $rowWorkout = $result3->fetch_assoc();
            $idWorkout = $rowWorkout["id"];
            
            // Inserisco gli esercizi nel workout
            foreach ($exerciseArray as $value) {
                $nomeEsercizio = $value;
                
                // Controllo se l'esercizio esiste già, altrimenti lo creo
                $queryCheckExerciseExist = "SELECT * FROM esercizi WHERE nome = '$nomeEsercizio' AND email_utente = '$email';";
                
                $resultQueryCheckExercise = $conn->query($queryCheckExerciseExist);
                //print_r($resultQueryCheckExercise->fetch_assoc());
                if ($resultQueryCheckExercise->num_rows == 0) {
                    // Se l'esercizio non esiste, lo inserisco
                    $queryInsertExercise = "INSERT INTO esercizi (nome, email_utente) VALUES ('$nomeEsercizio', '$email');";
                    $resultInsertExercise = $conn->query($queryInsertExercise);
    
                    if (!$resultInsertExercise) {
                        $res["inserimentoEsercizio"] = false;
                        echo json_encode($res);
                        return;
                    }
                }
                $queryCheckExerciseExist = "SELECT * FROM esercizi WHERE nome = '$nomeEsercizio' AND email_utente = '$email';";
                $result2 = $conn->query($queryCheckExerciseExist);
                // Ottengo l'ID dell'esercizio
                $rowExercise = $result2->fetch_assoc();
                //print_r($rowExercise);
                $idEsercizio = $rowExercise["id"];
                // Inserisco l'associazione tra workout ed esercizio
                $queryInsertAssociation = "INSERT INTO esercizi_workouts (id_workout, id_esercizio) VALUES ($idWorkout, $idEsercizio);";
                $resultInsertAssociation = $conn->query($queryInsertAssociation);
    
                if (!$resultInsertAssociation) {
                    $res["inserimentoAssociazione"] = false;
                    echo json_encode($res);
                    return;
                }
            }
    
            $res["inserimento"] = true;
        } else {
            $res["login"] = false;
        }
    
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
            
            $query = "SELECT e.nome, 
                 GROUP_CONCAT(setss.num_set , setss.repetitions ORDER BY setss.num_set ASC) AS num_set, 
                 GROUP_CONCAT(setss.peso ORDER BY setss.num_set ASC) AS peso, 
                 GROUP_CONCAT(setss.repetitions ORDER BY setss.num_set ASC) AS repetitions
          FROM esercizi e
          INNER JOIN esercizi_workouts ew ON e.id = ew.id_esercizio
          INNER JOIN workouts w ON ew.id_workout = w.id
          LEFT JOIN setss ON setss.nome_esercizio = e.nome AND setss.email_utente = '$email'
          WHERE w.nome = '$nomeWorkout' AND w.email_utente = '$email'
          GROUP BY e.nome;";
            
            $result_query = $conn->query($query);
            if ($result_query->num_rows > 0) {
                $exercises = array();

                while ($row = $result_query->fetch_assoc()) {
                    if($row["num_set"]!=null && $row["peso"]!=null && $row["repetitions"]!=null) {
                        $exercise = array(
                            "nome" => $row["nome"],
                            "num_set" => str_getcsv($row["num_set"]),
                            "peso" => str_getcsv($row["peso"]),
                            "reps" => str_getcsv($row["repetitions"])
                        );
                    }
                    else {
                        $exercise = array(
                            "nome" => $row["nome"],
                            "num_set" => null,
                            "peso" => null,
                            "reps" => null
                        );
                    }
                    $exercises[] = $exercise;
                }
    
                $res["exercises"] = $exercises;
            } else {
                $res["exercises"] = null;
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
            $exist = false;
            $email = $_POST["cookie_email"];
            $nomeEsercizio = $_POST["nome_esercizio"];
            $numSet = $_POST["num_set"];
            $peso = $_POST["peso"];
            $repetitions = $_POST["repetitions"];
            $queryCheckExerciseExist = "select * from setss where nome_esercizio = '$nomeEsercizio' and email_utente='$email';";
            if($conn->query($queryCheckExerciseExist)->num_rows >= 1) {
                $exist = true;
            }
            if($peso !=0 && $repetitions!=0 && $exist) {
                $queryInsertSet = "UPDATE setss set peso = $peso, repetitions= $repetitions where num_set = $numSet AND nome_esercizio= '$nomeEsercizio' AND email_utente = '$email';";
                echo $queryInsertSet;
                if ($conn->query($queryInsertSet)) {
                    $res["inserimento"] = true;
                } else {
                    $res["inserimento"] = false;
                }
            } else {
                $sql = "SELECT MAX(num_set) AS ultimo_set FROM setss 
                        WHERE nome_esercizio = '$nomeEsercizio' AND email_utente = '$email'";

                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $ultimo_set = $row["ultimo_set"] + 1;
                }else 
                    $ultimo_set = 1;
                
                $queryInsertSet = "INSERT INTO setss(nome_esercizio, email_utente, num_set, peso, repetitions) values('$nomeEsercizio', '$email', $ultimo_set, $peso, $repetitions);";
                echo $queryInsertSet;
                if ($conn->query($queryInsertSet)) {
                    $res["inserimento"] = true;
                } else {
                    $res["inserimento"] = false;
                }
            }
        }else 
            $res["login"] = false;
        echo json_encode($res);
    }
?>