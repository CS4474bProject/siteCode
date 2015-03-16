function authError(data){
    //Checks what type of error we have.
    errorMessage = "";
    
    //We automatically clear the textbox for password.
    $("#password").val("");
    
    //Checks what message to display.
    if (data === 'error') {
        errorMessage = 'A connection problem with Student Center has occurred.<br/>' +
                       'Please contact ITS at (519) 661-3800 for help with your account.<br/></br>';
    } else {
        errorMessage = 'Your username and password are not correct.<br/>' +
                       'Please try again.<br/><br/>';
    }          
    
    //Displays the message.
    $('div.error').html(errorMessage);
    
    //We want to shake the div.
    $( "#Login" ).effect( "shake" );
}

function authSuccess(uName){
    //We create a login cookie.
    document.cookie = 'username=' + uName + ';path=/';
    
    //We now redirect the page.
    window.location.replace('LaunchPage.html');
}

function results(data){
    if (data === 'error' || data === null){
        authError(data);
    } else {
        authSuccess(data);
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
    sql = "SELECT UserName FROM User WHERE UserName = \"" + userName + "\" AND Password = \"" 
            + password + "\";";
    result = runSQL(sql, results);
    
    //Prevent the page from reloading.
    return false;
}

function isLoggedIn(pageURL){
    //We need to check if the username cookie exists.
    uname = getCookie('username');
    
    //If it doesn't exist.
    if (uname === null || uname === "" || typeof uname != 'undefined'){
        //We need to create an error cookie and redirect.
        document.cookie = 'auth=' + pageURL + 'path=/;';
        window.location.replace('LaunchPage.html');
    }
}