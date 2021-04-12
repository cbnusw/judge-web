import { Component, OnInit } from '@angular/core';
import { SideMenuService} from '../../shared/services/side-menu.service'
@Component({
  selector: 'sw-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  hiddenSideMenu: boolean;
  constructor(public side: SideMenuService) {
    this.hiddenSideMenu = this.side.hidden;
   }

  ngOnInit(): void {

  }

  toggleHideMenu(): void {
    this.hiddenSideMenu = !this.hiddenSideMenu;
    this.side.hidden = this.hiddenSideMenu;
  }
}
