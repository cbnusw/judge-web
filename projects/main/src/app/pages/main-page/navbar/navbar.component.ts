import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
export interface Menu {
  name: string;
  link: string;
}
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() menus: Array<Menu> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
