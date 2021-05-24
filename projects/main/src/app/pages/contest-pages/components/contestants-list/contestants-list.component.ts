import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { IUserInfo } from '../../../../models/user-info';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'sw-contestants-list',
  templateUrl: './contestants-list.component.html',
  styleUrls: ['./contestants-list.component.scss']
})
export class ContestantsListComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;
  private _contestants: IUserInfo[];

  columns = ['no', 'name', 'department', 'email', 'phone'];
  @Input() contestWriter: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService) {
  }

  @Input() set contestants(contestants: IUserInfo[]) {
    contestants = [...(contestants || [])];
    contestants.sort((a, b) => {
      if (a.no < b.no) {
        return -1;
      } else if (a.no > b.no) {
        return 1;
      } else {
        return 0;
      }
    });
    this._contestants = [...contestants];
  }

  get contestants(): IUserInfo[] {
    return this._contestants;
  }

  ngAfterViewInit(): void {

    this.subscription = this.sort.sortChange
      .subscribe(event => {
        const { direction, active } = event;
        this._contestants.sort((a, b) => {
          if (direction === 'asc') {
            if (a[active] < b[active]) {
              return -1;
            } else if (a[active] > b[active]) {
              return 1;
            } else {
              return 0;
            }
          } else if (direction === 'desc') {
            if (a[active] > b[active]) {
              return -1;
            } else if (a[active] < b[active]) {
              return 1;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        });
        this._contestants = [...this._contestants];
      });
  }

  ngOnDestroy(): void {
  }

}
