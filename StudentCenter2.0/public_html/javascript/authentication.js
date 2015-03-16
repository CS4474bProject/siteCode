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
    
    alert(result);
}

function authError(){
    alert("BLAMO");
}