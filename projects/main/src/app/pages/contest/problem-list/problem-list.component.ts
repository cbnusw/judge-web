import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Problem } from '../../../models/problem';
import { AuthService } from '../../../services/auth.service';
import { ContestDetailService } from '../contest-detail.service';

@Component({
  selector: 'sw-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  isWriter: boolean
  dataSource: Array<any>;
  displayedColumns: string[] = ['title'];
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService,
    private auth:AuthService,
    private router:Router
  ) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.detail.getContest(params.get('id')).pipe(map(data => data.problems)).subscribe(res => this.dataSource = res);
    });
  }
  routeToProblem(id: string) {
    this.router.navigate([`/contests/problem/${id}`])
  }
  ngOnInit(): void {
  }

}
