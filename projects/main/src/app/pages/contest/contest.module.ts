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
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProblemPostComponent } from './problem-post/problem-post.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { ProblemListComponent } from './problem-list/problem-list.component';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    ContestDetailComponent,
    ContestPostComponent,
    ContestListComponent,
    ContestComponent,
    ContestApplyComponent,
    DialogContentExampleDialog,
    ProblemPostComponent,
    ProblemDetailComponent,
    ProblemListComponent
  ],
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatListModule,
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
    MatTableModule
  ],
  entryComponents: [
    MatDialogModule
  ],
})
export class ContestModule { }
