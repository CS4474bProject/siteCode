function runSQL(sqlQuery){
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
            return data;
        },
        fail: function(data) {
            return null;
        }
    });
}

