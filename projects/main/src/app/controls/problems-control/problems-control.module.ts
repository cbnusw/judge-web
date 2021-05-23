import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsControlComponent } from './problems-control/problems-control.component';


@NgModule({
  declarations: [ProblemsControlComponent],
  exports: [ProblemsControlComponent],
  imports: [
    CommonModule
  ]
})
export class ProblemsControlModule {
}
