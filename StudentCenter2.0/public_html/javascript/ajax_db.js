function runSQL(sqlQuery, executeFunction){
    //Checks to make sure sql is good.
    if (sqlQuery === "")
        executeFunction(null);
    
    //Runs the AJAX query.
    $.ajax({
        type: 'POST',
        url: '../php/sqlite.php',
        dataType: 'html',
        data: {
            'sql': sqlQuery
        },
        success: function(data) {
            //Checks for success or not.
            alert (data);
            if (data === "error" || data === null || data === "") {
                executeFunction(null);
            } 
            
            executeFunction(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            executeFunction('error');
        }
    });
}

