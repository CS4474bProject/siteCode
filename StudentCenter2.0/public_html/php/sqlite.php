<?php
    //First, we get the data.
    $query = "SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum;"; 
            //$_GET['sql'];
    
    //Ensures we don't have error.
    if ($query == ""){
        die("error");
    }
    
    //Next we run sqlite.
    $dir = 'sqlite:../database/data.db';
    $db = new PDO($dir) or die("error");
    $results = $db->query($query);
    
    //Generates array for row.
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        print_r($row);
    }
?>