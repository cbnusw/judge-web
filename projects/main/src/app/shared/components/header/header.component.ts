import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SideMenuService } from '../../services/side-menu.service';


@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hiddenSideMenu: boolean;

  constructor(
    public authService: AuthService,
    private sideMenuService: SideMenuService,
  ) {
    this.hiddenSideMenu = this.sideMenuService.hidden;
  }

  toggleSideMenu(): void {
    this.hiddenSideMenu = !this.hiddenSideMenu;
    this.sideMenuService.hidden = this.hiddenSideMenu;
    
  }

  ngOnInit(): void {
  }

}
