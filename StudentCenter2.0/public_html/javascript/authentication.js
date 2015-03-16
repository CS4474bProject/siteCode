function authError(){
    alert("BLAMO");
}

function authSuccess(){
    alert("BLAMO2");
}

function results(data){
    if (data === "error" || data === null){
        authError();
    } else {
        authSuccess();
    }
}

function verifyUser(){
    //Gets the username and password.
    userName = $("#username").val();
    password = $("#password").val();
    
    //Check for empty.
    if (userName === "" || password === "") {
        authError();
        return;
    }
    
    //Disables all the buttons.
    $("#login_form").children('input[type=submit]').prop('disabled', true);
        
    //Runs HTML query.
    sql = "SELECT * FROM User WHERE UserName = \"" + userName + "\" AND Password = \"" 
            + password + "\";";
    result = runSQL(sql, results);
    
    //Prevent the page from reloading.
    return false;
}