import { Component, OnInit, SimpleChange } from '@angular/core';
import { ContestDetailService, PostEnrollData } from '../contest-detail.service'
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  subscription: Subscription;
  contests: any;
  changeDetected: boolean;
  num: number = 1;
  constructor(private http: HttpClient, private detail: ContestDetailService, private authService: AuthService, private route: ActivatedRoute, private router:Router) {
    detail.getContests().subscribe(res => { this.contests = res.data; console.log(this.contests); this.num += 1;})

  }

  //enrolling User
  protected enrollUser = function (_id: any) {
    const userId = this.authService.me.info._id;
    const contestId = _id;
    return this.detail.postEnrollments(userId, contestId).subscribe(res => {
      alert("참가되었습니다.");
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, err => {
      if (err.error.code == ERROR_CODES.CONTEST_USER_DUPLICATED) alert(err.error.message);
      else alert(err.error.message);
    })
  }

  //unenrolling User
  protected unenrollUser = function (_id: any) {
    const userId = this.authService.me.info._id;
    const contestId = _id;
    return this.detail.postunEnrollments(userId, contestId).subscribe(res => {
      alert("참가 취소되었습니다.");
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, err => {
      if (err.error.code == ERROR_CODES.CONTEST_USER_DUPLICATED) alert(err.error.message);
      else alert(err.error.message);
    })
  }

  ngOnInit(): void {
  }

}

