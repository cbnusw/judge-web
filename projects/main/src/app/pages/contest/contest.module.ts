import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ContestRoutingModule } from './contest-routing.module';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';


@NgModule({
  declarations: [ContestDetailComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    MatCardModule
  ]
})
export class ContestModule { }
