/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function themeSwitch(){
    
    var button = $('input[type=image]');
    
    if ( button.className === "dark" ) {
        body.className = "lightTheme";
        button.className = "";
    } else {
        body.className = "darkTheme";
        button.className = "dark";
    }
}

