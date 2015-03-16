function verifyUser(){
    //Gets the username and password.
    userName = $("#username").val();
    password = $("#password").val();
    
    //Check for empty.
    if (userName === "" || password === "") {
        authError();
        return;
    }
    
    //Runs HTML query.
    sql = "SELECT * FROM User WHERE UserName = \"" + userName + "\" AND Password = \"" 
            + password + "\";";
    result = runSQL(sql);
    
    //Check for errors.
    if (result === null){
        authError();
    } else {
        authSuccess();
    }
}

function authError(){
    alert("BLAMO");
}

function authSuccess(){
    alert("BLAMO2");
}