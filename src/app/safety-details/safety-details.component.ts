import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Directive } from '@angular/core';
import html2canvas from 'html2canvas';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-safety-details',
  templateUrl: './safety-details.component.html',
  styleUrls: ['./safety-details.component.scss']
})
export class SafetyDetailsComponent implements OnInit {

  safety = {
    "id": 1,
    "incidentId": 10,
    "remediationCreatorId": "190345",
    "incidentCreatorId": "190345",
    "step1": {
      "narrative": "test",
      "correctiveAction": "test",
      "preventativeAction": "test",
      "afterCare": "test",
      "emergencyServices": "f"
    },
    "step2": {
      "question1": "test2",
      "question2": "test2",
      "question3": "test2",
      "question4": "test2"
    },
    "step3": {
      "question1": "test 3",
      "question2": "test 3",
      "question3": "test3",
      "question4": "test3 is complete"
    },
    "isCompleted": true
  };
incidentTable;
@ViewChild('pdfTable2', {static: false}) pdfTable2: ElementRef;

ngOnInit(){

}


constructor(){

}

downloadPDF(){
  let data = document.getElementById('pdfTable2'); 
  html2canvas(data).then(canvas => {
    var imgWidth = 208;   
    var pageHeight = 295;    
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    var heightLeft = imgHeight;
    var position = 0;    
    const contentDataURL = canvas.toDataURL('image/png') ; 
  // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    let pdf = new jsPDF('p', 'mm', 'a4'); //Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);  
 pdf.output('dataurlnewwindow');
});
}

  public downloadAsPDF() {
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const pdfTable = this.pdfTable2.nativeElement;

  doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    width: 208,
    'elementHandlers': specialElementHandlers
  });

  doc.save('tableToPdf.pdf');
  //doc.output('dataurlnewwindow');
}



}
