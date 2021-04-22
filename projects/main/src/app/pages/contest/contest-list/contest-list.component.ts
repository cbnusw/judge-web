import { Component, OnInit } from '@angular/core';
import { ContestDetailService, Post } from '../contest-detail.service'
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { ACCESS_TOKEN_KEY, StorageService } from '../../../services/storage.service';

@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  private readonly BASE_URL = environment.authHost;
  subscription: Subscription;
  contests: Array<Post>
  constructor(private http: HttpClient, detail: ContestDetailService) {
    this.contests = detail.getContests();
    this.http = http;
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
