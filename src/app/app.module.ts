import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfComponent } from './pdf/pdf.component';
import { IncidentDetailsComponent } from './incident-details/incident-details.component';
import { SafetyDetailsComponent } from './safety-details/safety-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfComponent,
    IncidentDetailsComponent,
    SafetyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
