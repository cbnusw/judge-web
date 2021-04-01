import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ContestListComponent } from './contest-list/contest-list.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainPageComponent,
    ContestListComponent,
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
