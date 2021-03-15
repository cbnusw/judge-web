import { Component } from '@angular/core';
import { Menu } from './pages/main-page/navbar/navbar.component';
@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'main';

  menuGroup: Array<Menu> = [
    { name: 'HOME', link: "#" },
    { name: 'CONTESTS', link: "#" },
    { name: 'ABOUT', link: "#" },
    { name: 'HELP', link: "#" },
    { name: 'CONTACT', link: "#" },
  ];

}
