import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApplyingPeriodPipe } from './applying-period.pipe';
import { TestPeriodPipe } from './test-period.pipe';



@NgModule({
  declarations: [ApplyingPeriodPipe, TestPeriodPipe],
  imports: [
    CommonModule
  ],
  exports: [ApplyingPeriodPipe, TestPeriodPipe],
  providers: [DatePipe]
})
export class PeriodModule { }
