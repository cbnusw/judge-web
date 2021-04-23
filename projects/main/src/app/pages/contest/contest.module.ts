import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContestPostComponent } from './contest-post/contest-post.component'
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { ContestListComponent } from './contest-list/contest-list.component';
import { ContestComponent } from './contest.component';
import { ContestRoutingModule } from './contest-routing.module';
import { FileModule } from '../../directives/file/file.module';
import { ContestApplyComponent } from './contest-apply/contest-apply.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogContentExampleDialog} from './contest-apply/contest-apply.component'

@NgModule({
  declarations: [
    ContestDetailComponent,
    ContestPostComponent,
    ContestListComponent,
    ContestComponent,
    ContestApplyComponent,
    DialogContentExampleDialog,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    RouterModule,
    ContestRoutingModule,
    FileModule,
    MatDialogModule,
  ],
  entryComponents: [
    MatDialogModule
  ],
})
export class ContestModule { }
