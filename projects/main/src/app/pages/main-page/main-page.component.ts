import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sw-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {

  }
}
