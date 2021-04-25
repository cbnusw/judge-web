import { Component, OnInit } from '@angular/core';
import { ContestDetailService, Post } from '../contest-detail.service'
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { ACCESS_TOKEN_KEY, StorageService } from '../../../services/storage.service';
import { Contest } from '../../../models/contest';

@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  private readonly BASE_URL = environment.authHost;
  subscription: Subscription;
  contests: any;
  constructor(private http: HttpClient, detail: ContestDetailService) {
    detail.getContests().subscribe(res => {this.contests = res.data;console.log(this.contests)});
  }

  //enrolling User
  protected enrollUser = function (_id: any) {
    const storageService = new StorageService;
    const token = storageService.get(ACCESS_TOKEN_KEY);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    let options = { headers: headers };
    this.subscription = this.http.post('http://localhost:3001/v1/contest-enroll', { id: `${_id}` }, options)
      .subscribe(
        res => {
          console.log(res);
        }
      )
  }



  ngOnInit(): void {
  }

}
