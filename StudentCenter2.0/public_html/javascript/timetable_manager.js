$(function(){
      $("#timetable").load("timetable.html"); 
});
$(document).ready(function(){
      $("#lol").tooltip();
});

function addCourse(name, subCode, code, classroom, semester, startTime, day, len){
    //First, we get the first time element.
    elementCode = '#';
    if (semester === 2) elementCode += 2;
    elementCode += day + startTime;
    
    //Selects the first element.
    startCell = $(elementCode);
    
    //We delete the rows below.
    index = startCell.index();  
    for (i = 1; i < (len / 0.5); i++) { 
        //Gets the next cell.
        nextCell = $(elementCode).closest('tr').next().children().eq(index);
        
        //Removes it.
        if (i !== 1)
            $(elementCode).remove();
        
        //Gets important next variables.
        index = nextCell.index();
        elementCode = '#' + nextCell.attr('id');
    }

    //Removes final element.
    $(elementCode).remove();
    
    //Merges the new cells together.
    startCell.attr('rowspan', len / 0.5);
    
    //Add in information to table.
    startCell.html('<div class="name">' + subCode +
                   '</div><div class="code">' + code +
                   '<div class="classroom">' + classroom +
                   '</div>');
           
    //Adds the tooltip attribute.
    startCell.attr('title', name);
    
    $(function() {
            $('#' + startCell.attr('id')).tooltip();
    });
}