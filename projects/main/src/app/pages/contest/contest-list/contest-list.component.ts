import { Component, OnInit } from '@angular/core';
import {ContestDetailService, Post} from '../contest-detail.service'
@Component({
  selector: 'sw-contest-list',
  templateUrl: './contest-list.component.html',
  styleUrls: ['./contest-list.component.scss']
})
export class ContestListComponent implements OnInit {
  contests:Array<Post>
  constructor(detail:ContestDetailService) {
    this.contests = detail.getContests();
  }

  ngOnInit(): void {
  }

}
