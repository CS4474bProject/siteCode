$(function(){
      $("#timetable").load("timetable.html"); 
});

function getCourses(){
    //We load in all the courses.
    runSQL("SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum;", receiveCourses);
}

function receiveCourses(data){
    alert(data[0]);
    alert(data[0]['CourseNum']);
    //Generate the buttons.
    lastNum = 0;
    for (i = 0; i < data.length; i++){
        //Gets the last array element.
        element = data[i];
       
        //Checks if the last course was also a time.
        if (lastNum === element['CourseNum']){
            $( '#' + lastNum ).attr('onClick', $( '#' + lastNum ).attr('onClick') +
                    'addCourse("Introduction to Political Science", "Polisci", "1000A", "SSC-2028", 1, "230p", "Mon", 2);');
        } else {
            $( '#buttons' ).html($( '#buttons' ).html() + 
                    '<button type="button" id="' + element['CourseNum'] +
                    '" onclick=\'addCourse("Introduction to Political Science","Polisci", "1000A", "SSC-2028", 1, "230p", "Mon", 2);\'>');
            lastNum = element['CourseNum'];
        }
   }
}

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