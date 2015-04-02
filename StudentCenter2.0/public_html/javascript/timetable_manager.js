//The courses array.
var courses = {};

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
    if ($('#CourseName').val() === "") {
        subjectTable = $( '#courses' );
        subjectTable.html('<tr>' +
                    '<th>Course Code</th>' +
                    '<th class=\"name\">Course Name</th>' +
                    '<th>Subject</th>' +
                    '<th class=\"date\">Date</th>' +
                    '<th>Options</th>' +
                '</tr>');
        $('#results').html("Please search above to see courses.");
        return;
    }
    
    //We search for the courses.
    sql = "SELECT * FROM Courses INNER JOIN Date ON Courses.CourseNum = Date.CourseNum";
    if (!(subject === "All Subjects")){
        sql += " WHERE Subject = \"" + subject + "\" AND (";
    } else {
        sql += " WHERE (";
    }
    sql += " CourseName LIKE \"" + $('#CourseName').val() + "%\" OR" +
           " CourseCode LIKE \"" + $('#CourseName').val() + "%\");";
   
    //Runs the SQL.
    runSQL(sql, populateCourses);
}

function populateCourses(data){
    //Clears the courses array.
    courses = {};
    
    //Creates the table.
    subjectTable = $( '#courses' );
    subjectTable.html('<tr>' +
                    '<th>Course Code</th>' +
                    '<th class=\"name\">Course Name</th>' +
                    '<th>Subject</th>' +
                    '<th class=\"date\">Date</th>' +
                    '<th>Options</th>' +
                '</tr>');
        
    //If error, we handle it.
    if (data === "error" || data.length === 0){
        $('#results').html("No courses were found.");
        return;
    } else {
        $('#results').html("");
    }
    
    //Loop through each of the courses.
    for (i = 0; i < data.length; i++){
        element = data[i];
        
        //Checks if last course was the same.
        if (i > 0 && element['CourseNum'] === data[i-1]['CourseNum']){
            $( '#' + element['CourseNum'] + 'Date' ).append('<br>' + element['DayOfWeek'] + ', ' + 
                    element['StartTime'] + ' - ' + element['EndTime']);
            
            //Adds in the two time elements.
            courses[element['CourseNum']]['StartTime'].push(element['StartTime']);
            courses[element['CourseNum']]['EndTime'].push(element['EndTime']);
            courses[element['CourseNum']]['DayOfWeek'].push(element['DayOfWeek']);
         
            continue;
        } else {
            //Creates a new array for the course.
            courses[element['CourseNum']] = {};
            courses[element['CourseNum']]['StartTime'] = new Array;
            courses[element['CourseNum']]['EndTime'] = new Array;
            courses[element['CourseNum']]['DayOfWeek'] = new Array;
        }
        
        subjectTable.append('<tr>' + 
                '<td>' + element['CourseCode'] + '</td>' +
                '<td class=\"name\">' + element['CourseName'] + '</td>' +
                '<td>' + element['Subject'] + '</td>' +
                '<td class=\"date\" id="' + element['CourseNum'] + 'Date">' + element['DayOfWeek'] + ', ' + 
                    element['StartTime'] + ' - ' + element['EndTime'] + '</td>' +
                '<td id="' + element['CourseNum'] + 'Button"></td>' +
                '</tr>');
        
        //Pushes all the data.
        courses[element['CourseNum']]['CourseCode'] = element['CourseCode'];
        courses[element['CourseNum']]['CourseName'] = element['CourseName'];
        courses[element['CourseNum']]['Subject'] = element['Subject'];
        courses[element['CourseNum']]['StartTime'].push(element['StartTime']);
        courses[element['CourseNum']]['EndTime'].push(element['EndTime']);
        courses[element['CourseNum']]['DayOfWeek'].push(element['DayOfWeek']);
        
        //Generates its enroll button.
        $( '#' + element['CourseNum'] + "Button" ).html(
                    '<button type="button" id="' + element['CourseNum'] +
                    'inButton" onclick=\'setupDialog("' + element['CourseNum'] + '");\'>' +  
                    'Enroll</button>');
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

function generateButtons(data){
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
            $( '#' + element['CourseNum'] + "inButton" ).attr('onClick', $( '#' + element['CourseNum'] + "inButton" ).attr('onClick') +
                    'addCourse("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "' + divID + '", "' + element['DayOfWeek'] + '", ' + duration + ');');
        } else {
            $( '#' + element['CourseNum'] + "Button" ).html(
                    '<button type="button" id="' + element['CourseNum'] +
                    'inButton" onclick=\'setupDialog("' + element['CourseName'] + '","' + element['Subject'] + '", "' + element['CourseCode'] + '", "SSC-2028", ' + element['Semester'] + ', "' + divID + '", "' + element['DayOfWeek'] + '", ' + duration + ');\'>' +
                    'Enroll</button>');
            lastNum = element['CourseNum'];
        }
   }
}

function setupDialog(courseNum){
    //Sets the dialog up.
    $('#modal-table').children( 'tr' ).remove();
    $( '#dialog' ).attr("title", "Adding Course: " + courses[courseNum]["Subject"] + " " + courses[courseNum]["CourseCode"]);
    $( '#modal-table tr:last' ).after("<tr><td>" +
            courses[courseNum]["CourseCode"] + "</td><td class=\"name\">" + courses[courseNum]["CourseName"] + "</td><td>" + courses[courseNum]["Subject"] + "</td><td id=\"dat_column\" class=\"date\"></td></tr>");
    
    //Generates the date items.
    for (i = 0; i < courses[courseNum]['StartTime'].length; i++){
        if (i > 0) $('#dat_column').append("<br>");
        $('#dat_column').append(courses[courseNum]['DayOfWeek'][i] + ", " + 
                courses[courseNum]['StartTime'][i] + " - " + courses[courseNum]['EndTime'][i]);
    }
    
    $( '#dialog' ).dialog({ modal: true, width: 700 });
    $( '#dialog' ).prev(".ui-dialog-titlebar").css("background","#633e9c");
    
    //Generates the buttons.
    generateButtons(data);
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