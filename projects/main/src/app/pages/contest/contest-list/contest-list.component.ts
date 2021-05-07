import { Component, OnInit } from '@angular/core';
import { ContestDetailService, PostEnrollData } from '../contest-detail.service'
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ERROR_CODES } from '../../../constants/error-codes';
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
    return this.detail.postEnrollments(userId, contestId).subscribe(res => {
      alert("참가되었습니다.");
    }, err => {
      if (err.error.code == ERROR_CODES.CONTEST_USER_DUPLICATED) alert(err.error.message);
      else alert(err.error.message);
    })
  }
  ngOnInit(): void {
  }

}
