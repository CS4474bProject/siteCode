function runSQL(sqlQuery, executeFunction){
    //Checks to make sure sql is good.
    if (sqlQuery === "")
        return null;
    
    //Runs the AJAX query.
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {sql : sqlQuery},
        url: '../php/sqlite.php',
        success: function(data) {
            alert(data);
            //Checks for success or not.
            if (data === "error" || data === null) {
                executeFunction(null);
            } 
            
            executeFunction(data);
        }
    });
}

