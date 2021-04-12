import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';

import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule {}
