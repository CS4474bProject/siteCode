$(function(){
      $("#timetable").load("timetable.html"); 
});

function generatePDF(){
    //Creates the new PDF object.
    var pdf = new jsPDF('p', 'in', 'letter');
         
    // We'll make our own renderer to skip this editor
    var specialElementHandlers = {
            '#editor': function(element, renderer){
                    return true;
            }
    };

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    pdf.fromHTML($('body').get(0), 15, 15, {
            'width': 170, 
            'elementHandlers': specialElementHandlers
    });
    
    pdf.output("dataurlnewwindow");
}