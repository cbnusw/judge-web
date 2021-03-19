import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SideMenuService } from '../../services/side-menu.service';

interface Menu {
  name: string;
  link: string;
}


@Component({
  selector: 'sw-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;

  menuGroup: Array<Menu> = [
    { name: 'HOME', link: '/main' },
    { name: 'CONTESTS', link: '/contests' },
    { name: 'ABOUT', link: '/about' },
    { name: 'HELP', link: '/help' },
    { name: 'CONTACT', link: '/contact' },
  ];

  @ViewChild(MatDrawer) drawer: MatDrawer;

  constructor(private sideMenuService: SideMenuService) { }

  ngAfterViewInit(): void {
    this.subscription = this.sideMenuService.hidden$.subscribe(hidden => {
      hidden ? this.drawer.close() : this.drawer.open();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
