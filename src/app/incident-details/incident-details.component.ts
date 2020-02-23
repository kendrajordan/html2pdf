import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, Directive } from '@angular/core';
import html2canvas from 'html2canvas';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss']
})
export class IncidentDetailsComponent implements OnInit {

  incident = {
    "id": 3,
    "incidentCreatorId": 3333,
    "incidentDate": "2020-02-14T05:00:00.000Z",
    "location": "Springfield",
    "incidentType": "1",
    "priority": "Low",
    "region": "Cumberland Plateau",
    "county": "Bath",
    "supervisor": "Millhouse",
    "peopleInvolved": [
      {
        "firstname": "Bart",
        "lastname": "Simpson",
        "role": "Victim"
      },
      {
        "firstname": "Homer",
        "lastname": "Simpson",
        "role": "Perpetrator"
      },
      {
        "firstname": "Sideshow",
        "lastname": "Bob",
        "role": "Perpetrator"
      }
    ],
    "narrative": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor tellus vitae interdum porttitor. Nam blandit interdum erat, sed fermentum ipsum blandit egestas. Praesent metus lectus, vulputate quis dui in, fringilla sodales elit. Proin dignissim ante tellus, non finibus ipsum ultrices non. Etiam sed iaculis nibh. Nullam sed commodo libero. Donec fermentum, quam in tincidunt accumsan, ante enim suscipit nibh, ut rhoncus ante risus ut ex.",
    "correctiveAction": "Donec orci est, tincidunt at venenatis eu, blandit non justo. Cras congue, quam ut lobortis porttitor, turpis sapien suscipit ante, non malesuada dui sem at eros. Sed elementum ligula non maximus consectetur. Morbi suscipit risus at blandit posuere. Quisque rhoncus ultricies dui, sed tristique purus ullamcorper nec. Duis tincidunt augue nulla, ut mollis ipsum volutpat nec.",
    "preventativeAction": "Testing",
    "afterCare": "Duis accumsan sapien sed placerat fringilla. Sed condimentum consectetur magna, eu euismod mauris ultrices nec. Curabitur interdum, risus efficitur lobortis pellentesque, ante est posuere enim, sit amet pharetra nisi urna a elit. Maecenas imperdiet eleifend velit ac aliquam. Morbi gravida non nulla id convallis. Integer porttitor nulla arcu, non laoreet odio volutpat ultrices.",
    "emergencyServices": "Nullam dictum ut orci quis porta. Proin vel facilisis quam, eget aliquam lectus. Aliquam consectetur aliquam est, nec porta nisi venenatis a. Donec nec nulla nec quam placerat pulvinar eu congue orci. Vestibulum ut tellus sed nulla pulvinar dapibus. Ut in augue in orci placerat pharetra. Curabitur nec finibus arcu. Praesent faucibus nunc in nisl faucibus vehicula. Maecenas non fringilla nisi."
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
