import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from '../../../../models/user-info';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'sw-contestants-list',
  templateUrl: './contestants-list.component.html',
  styleUrls: ['./contestants-list.component.scss']
})
export class ContestantsListComponent implements OnInit {

  columns = ['no', 'name', 'department', 'email', 'phone'];

  @Input() contestWriter: string;
  @Input() contestants: IUserInfo[];

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }
}
