import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js' 
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() public incident;
  @Input() public safety;
incidentTable;
safetyTable;
getData(data){
    

var table= "";
   for(var key in data){
  
     if(Array.isArray(data[key])){
    
       var  arr = data[key];
       table+="<tr><th>"+key+"</th>"+"<td><table border='1'cellpadding='5'>";
       table+="<tr><th>firstname</th><th>lastname</th><th>role</th></tr>";
      for(var i = 0; i < arr.length; i++){
        table+="<tr><td>"+arr[i].firstname+"</td><td>"+arr[i].lastname+"</td><td>"+arr[i].role+"</td></tr>";
      }
      table+="</table></td></tr>";
     }else{
       table+="<tr><th>"+key+"</th><td>"+data[key]+"</td></tr>";
     }

   }
   table+= "";
   this.incidentTable = table;
   return this.incidentTable;

  }
  isObject(val) { return typeof val === 'object'; };
  getSafetyData(data){
    //var table= "<table border='1'cellpadding='5'>";
    var table="";
    for(var key in data){
      if(!this.isObject(data[key])){
        table+="<tr><th>"+key+"</th><td>"+data[key]+"</td></tr>";
      }else{
        for(var value in data[key]){
          table+="<tr><th>"+value+"</th><td>"+data[key][value]+"</td></tr>";
        }
      }
    }
    //table+="</table>";
    this.safetyTable = table;
    return this.safetyTable;
  }
  @ViewChild('pdfTable1', {static: false}) pdfTable1: ElementRef;
  @ViewChild('pdfTable2', {static: false}) pdfTable2: ElementRef;

  downloadIncidentPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable1.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }
  downloadSafetyPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable2.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }
  exportAsPDF(id)
      {
        let data = document.getElementById(id);  
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/png')  
          //let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
          let pdf = new jsPDF(); //Generates PDF in portrait mode
          pdf.addImage(contentDataURL, 'PNG', 0, 0);  
          pdf.save('Filename.pdf');   
        }); 
      }
      generatePdf(dataId) {
        let data = document.getElementById(dataId); 
        
        html2canvas(data).then(canvas => {
         let HTML_Width = canvas.width;
         let HTML_Height = canvas.height;
         let top_left_margin = 15;
         let PDF_Width = HTML_Width + (top_left_margin * 2);
         let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
         let canvas_image_width = HTML_Width;
         let canvas_image_height = HTML_Height;
         let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
         let imgData = canvas.toDataURL("image/jpeg", 1.0);
         let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
         pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
         for (let i = 1; i <= totalPDFPages; i++) {
           pdf.addPage([PDF_Width, PDF_Height], 'p');
           pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
         }
          pdf.save("HTML-Document.pdf");
       });
     }
     convert(){
      var element = document.getElementById('pdfTable1');
console.log(element);
      /*html2pdf(element, {
          filename:     'myfile.pdf',
          image:        { type: 'jpeg'},
          html2canvas:  {},
          jsPDF:        { orientation: 'p' }
      });*/
      const filename  = 'ThisIsYourPDFFilename.pdf';

      html2canvas(element).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.save(filename);
      });
 
     }

}
