import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ContestRoutingModule } from './contest-routing.module';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContestPostComponent } from './contest-post/contest-post.component'
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ContestDetailComponent, ContestPostComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    MatCardModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFileUploadModule,
    MatButtonModule
  ]
})
export class ContestModule { }
