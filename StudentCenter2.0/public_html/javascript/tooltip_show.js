function elementShow(elementID, elementMessage){
    //Sets the tip text.
    $( '#' + elementID ).html(elementMessage);
    
    //Shows the div element.
    document.getElementById(elementID).style.visibility = 'visible';
}

function elementHide(elementID){
    //Hides the element.
    document.getElementById(elementID).style.visibility = 'hidden';
}