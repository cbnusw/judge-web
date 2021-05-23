import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PeriodControlModule } from '../../controls/period-control/period-control.module';
import { InnerHtmlModule } from '../../directives/inner-html/inner-html.module';
import { PeriodModule } from '../../pipes/period/period.module';
import { ContestFormPageComponent } from './contest-form-page/contest-form-page.component';
import { ContestPagesRoutingModule } from './contest-pages-routing.module';
import { ContestListPageComponent } from './contest-list-page/contest-list-page.component';
import { MyContestListPageComponent } from './my-contest-list-page/my-contest-list-page.component';
import { ContestDetailPageComponent } from './contest-detail-page/contest-detail-page.component';
import { ContestantsListComponent } from './components/contestants-list/contestants-list.component';
import { HideEmailPipe } from './pipes/hide-email.pipe';
import { HidePhonePipe } from './pipes/hide-phone.pipe';
import { HideNoPipe } from './pipes/hide-no.pipe';
import { HideNamePipe } from './pipes/hide-name.pipe';


@NgModule({
  declarations: [
    ContestFormPageComponent,
    ContestListPageComponent,
    MyContestListPageComponent,
    ContestDetailPageComponent,
    ContestantsListComponent,
    HideEmailPipe,
    HidePhonePipe,
    HideNoPipe,
    HideNamePipe
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    ContestPagesRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PeriodControlModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule,
    PeriodModule,
    InnerHtmlModule,
  ]
})
export class ContestPagesModule {
}
