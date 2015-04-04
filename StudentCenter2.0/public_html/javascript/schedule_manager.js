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

    var source = window.document.getElementById("timetable");
    pdf.fromHTML(
        source,
        15,
        15,
        {
            'width': 180,'elementHandlers': elementHandler
        });

    pdf.output("dataurlnewwindow");
    alert("triggered");
}