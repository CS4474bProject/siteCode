$(function(){
      $("#timetable").load("timetable.html"); 
});

function generatePDF(){
    //Creates the new PDF object.
    var pdf = new jsPDF();
         
    var elementHandler = {
        '#ignorePDF': function (element, renderer) {
            return true;
        }
    };
    
    pdf.fromHTML(
        $('#timetable').get(0),
        15,
        15,
        {
            'width': 180,'elementHandlers': elementHandler
        });

    pdf.output("dataurlnewwindow");
}