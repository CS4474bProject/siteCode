<?php
    //First, we get the data.
    //$query = $_POST['sql'];
    
    $query = 'SELECT * FROM Users;';
    
    //Next we run sqlite.
    $db = new SQLite3('../database/data.db');
    $results = $db->query($query);
    
    echo $results;
?>