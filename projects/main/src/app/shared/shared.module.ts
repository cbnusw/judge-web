import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent, SideMenuComponent],
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  exports: [HeaderComponent, SideMenuComponent],
})
export class SharedModule {}
