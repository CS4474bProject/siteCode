/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function themeSwitch(){
    if ( image.className === "dark" ) {
        body.className = "lightTheme";
        image.className = "";
    } else {
        body.className = "darkTheme";
        image.className = "dark";
    }
}

