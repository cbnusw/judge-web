import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ContestRoutingModule } from './contest-routing.module';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'

@NgModule({
  declarations: [ContestDetailComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    MatCardModule,
    PdfViewerModule
  ]
})
export class ContestModule { }
