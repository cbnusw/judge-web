import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';



@NgModule({
  declarations: [HeaderComponent, SideMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, SideMenuComponent]
})
export class SharedModule { }
