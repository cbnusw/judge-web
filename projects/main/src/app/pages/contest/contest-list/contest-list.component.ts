import { Component, OnInit } from '@angular/core';
import { ContestDetailService, PostEnrollData } from '../contest-detail.service'
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { ACCESS_TOKEN_KEY, StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../services/auth.service';
import { Contest } from '../../../models/contest';

@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  subscription: Subscription;
  contests: any;
  constructor(private http: HttpClient, private detail: ContestDetailService, private authService: AuthService) {
    detail.getContests().subscribe(res => { this.contests = res.data; console.log(this.contests) });
  }

  //enrolling User
  protected enrollUser = function (_id: any) {
    const userId = this.authService.me._id;
    const contestId = _id;
    console.log(` usertId :: ${userId} contestId :: ${contestId}`);
    return this.detail.postEnrollments(userId, contestId).subscribe(res => { console.log(res) });
  }
  ngOnInit(): void {
  }

}
