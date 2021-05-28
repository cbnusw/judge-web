import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreBoardPagesRoutingModule } from './score-board-pages-routing.module';
import { ScoreBoardPageComponent } from './score-board-page/score-board-page.component';


@NgModule({
  declarations: [ScoreBoardPageComponent],
  imports: [
    CommonModule,
    ScoreBoardPagesRoutingModule
  ]
})
export class ScoreBoardPagesModule { }
