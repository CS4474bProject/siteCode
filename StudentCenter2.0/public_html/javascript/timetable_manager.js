$(function(){
      $("#timetable").load("timetable.html"); 
});

function getCourses(){
    //We load in all the courses.
    runSQL("SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum;", receiveCourses);
}

function loadCourseData(){
    //We get the subjects.
    runSQL("SELECT Subject FROM Courses GROUP BY Subject;", receiveSubjects);
}

function searchForCourses(){
    subject = $('#SubjectName').find(":selected").text();
    
    //We search for the courses.
    sql = "SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum";
    if (!(subject === "All Subjects")){
        sql += " WHERE Subject = \"" + subject + "\"";
    } else {
        sql += " WHERE";
    }
    sql += " CourseName LIKE \"" + $('#CourseName').val() + "%\" OR" +
           " CourseCode LIKE \"" + $('#CourseName').val() + "%\";";
   
    //Runs the SQL.
    runSQL(sql, populateCourses);
}

function populateCourses(data){
    //Creates the table.
    subjectTable = $( '#courses' );
    subjectTable.html('<tr>' +
                    '<th>Course Code</th>' +
                    '<th>Course Name</th>' +
                    '<th>Subject</th>' +
                    '<th>Date</th>' +
                    '<th>Options</th>' +
                '</tr>');
        
    //If error, we handle it.
    if (data === "error")
        return;
        
    //Loop through each of the courses.
    for (i = 0; i < data.length; i++){
        element = data[i];
        
        //Checks if last course was the same.
        if (i > 0 && element['CourseNum'] === data[i-1]['CourseNum']){
            $( '#' + element['CourseNum'] + 'Date' ).append('<br>' + element['DayOfWeek'] + ', ' + 
                    element['StartTime'] + ' - ' + element['EndTime']);
            continue;
        }           
        
        subjectTable.append('<tr>' + 
                '<td>' + element['CourseCode'] + '</td>' +
                '<td>' + element['CourseName'] + '</td>' +
                '<td>' + element['Subject'] + '</td>' +
                '<td id="' + element['CourseNum'] + 'Date">' + element['DayOfWeek'] + ', ' + 
                    element['StartTime'] + ' - ' + element['EndTime'] + '</td>' +
                '<td id="' + element['CourseNum'] + 'Button"></td>' +
                '</tr>');
    }
}

function receiveSubjects(data){
    //Loops through each of the subjects.
    for (i = 0; i < data.length; i++){
        element = data[i];
        
        //Adds in the option.
        $( '#SubjectName' ).append(
                '<option id="' + element['Subject'] + '">' +
                element['Subject'] + '</option>');
    }
}

function generateButton(data){
    //Generate the buttons.
    lastNum = 0;
    for (i = 0; i < data.length; i++){
        //Gets the last array element.
        element = data[i];
        
        //Manages time elements.
        end = 0;
        start = 0;
        if (element['EndTime'].split(':')[1].substring(2, 4) === "pm" &&
                element['EndTime'].split(':')[0] !== '12')
            end = parseInt(element['EndTime'].split(':')[0]) + 12;
        else
            end = element['EndTime'].split(':')[0];
        if (element['StartTime'].split(':')[1].substring(2, 4) === "pm" &&
                element['StartTime'].split(':')[0] !== '12')
            start = parseInt(element['StartTime'].split(':')[0]) + 12;
        else
            start = element['StartTime'].split(':')[0];

        startTime = new Date(2000, 0, 1, start, 
            element['StartTime'].split(':')[1].substring(0,2));
        endTime = new Date(2000, 0, 1, end, 
            element['EndTime'].split(':')[1].substring(0,2));
        
        //Gets the difference between the time.
        diff = endTime - startTime;
        duration = Math.floor(diff / 1000 / 60 / 60);
        diff -= duration * 1000 * 60 * 60;
        duration += Math.floor(diff / 1000 / 60);
        
        //Creates the element name.
        divID = element['StartTime'].split(':')[0] + 
                element['StartTime'].split(':')[1].substring(0, 2);
        if (element['StartTime'].split(':')[1].substring(2, 4) === "pm")
            divID += "p";
        
        //Checks if the last course was also a time.
        if (lastNum === element['CourseNum']){
            $( '#' + lastNum ).attr('onClick', $( '#' + lastNum ).attr('onClick') +
                    'addCourse("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "' + divID + '", "' + element['DayOfWeek'] + '", ' + duration + ');');
        } else {
            $( '#buttons' ).html($( '#buttons' ).html() + 
                    '<button type="button" id="' + element['CourseNum'] +
                    '" onclick=\'addCourse("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "' + divID + '", "' + element['DayOfWeek'] + '", ' + duration + ');\'>' +
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