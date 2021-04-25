import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contest } from '../../../models/contest';
import { ContestDetailService, Post } from '../contest-detail.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'sw-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.scss']
})
export class ContestDetailComponent implements OnInit {
  post: any;
  pdfReg= /\.pdf$/
  pictureReg=/\.jpeg$|\.png$|\.jpg/
  pictures: Array<any>
  UPLOAD_URL: string = environment.uploadHost 
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.detail.getContest(params.get('id')).subscribe(res=>{this.post=res;console.log(this.post)});
    });
  }
  ngOnInit(): void {

  }

}
