import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  joinPageUrl = environment.joinPageUrl;

  constructor(public auth: AuthService) {
  }

  logout(): boolean {
    this.auth.logout();
    return false;
  }

  ngOnInit(): void {
  }
}
