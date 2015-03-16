<?php
    //First, we get the data.
    $query = $_POST['sql'];
    
    //Ensures we don't have error.
    if ($query == ""){
        die("error");
    }
    
    //Next we run sqlite.
    $dir = 'sqlite:../database/data.db';
    $db = new PDO($dir) or die("error");
    
    //Generates JSON
    foreach ($db->query($query) as $row) {
        echo($row[0]);
    }
?>