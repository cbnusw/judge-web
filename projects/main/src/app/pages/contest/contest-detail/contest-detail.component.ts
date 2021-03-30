import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { ContestDetailService, Post } from '../contest-detail.service'
@Component({
  selector: 'sw-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {

  
  id: string
  post:Post
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.post = this.detail.getContest(+this.id);
    })
  }

  ngOnInit(): void {

  }

}
