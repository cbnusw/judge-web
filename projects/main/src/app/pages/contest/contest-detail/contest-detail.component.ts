import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContestDetailService, Post } from '../contest-detail.service';
@Component({
  selector: 'sw-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {
  post: Post;
  pdfReg= /\.pdf$/
  pictureReg=/\.jpeg$|\.png$|\.jpg/
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.post = this.detail.getContest(+params.get('id'));

    });
  }

  ngOnInit(): void {

  }

}
