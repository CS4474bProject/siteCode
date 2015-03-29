$(function(){
      $("#timetable").load("timetable.html"); 
});

function getCourses(){
    //We load in all the courses.
    runSQL("SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum;", receiveCourses);
}

function receiveCourses(data){
    //Generate the buttons.
    alert("hi");
    lastNum = 0;
    for (i = 0; i < data.length; i++){
        //Gets the last array element.
        element = data[i];
        
        //Manages time elements.
        end = 0;
        start = 0;
        if (element['EndTime'].split(':')[0] > 12)
            end = element['EndTime'].split(':')[0] + 12;
        else
            end = element['EndTime'].split(':')[0];
        if (element['StartTime'].split(':')[0] > 12)
            start = element['StartTime'].split(':')[0] + 12;
        else
            start = element['StartTime'].split(':')[0];
        startTime = new Date(2000, 0, 1, start, 
            element['StartTime'].split(':')[1].substring(0,1));
        endTime = new Date(2000, 0, 1, end, 
            element['EndTime'].split(':')[1].substring(0,1));
        
        //Gets the difference between the time.
        diff = endTime - startTime;
        duration = Math.floor(diff / 1000 / 60 / 60) + 
                   (Math.floor(msec / 1000 / 60) / 60);
        alert(duration);
        
        //Checks if the last course was also a time.
        if (lastNum === element['CourseNum']){
            $( '#' + lastNum ).attr('onClick', $( '#' + lastNum ).attr('onClick') +
                    'addCourse("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "230p", ' + element['DayOfWeek'] + ', 2);');
        } else {
            $( '#buttons' ).html($( '#buttons' ).html() + 
                    '<button type="button" id="' + element['CourseNum'] +
                    '" onclick=\'addCourse("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "230p", ' + element['DayOfWeek'] + ', 2);\'>' +
                    element['CourseName'] + '</button>');
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