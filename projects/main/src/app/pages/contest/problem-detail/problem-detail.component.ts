import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Problem } from '../../../models/problem';
import { ContestDetailService} from '../contest-detail.service';
import { environment } from '../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';
import { map } from 'rxjs/operators';
import { UploadService } from '../../../services/upload.service';
import { of } from 'rxjs';
@Component({
  selector: 'sw-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.scss']
})
export class ProblemDetailComponent implements OnInit {
  post: any;
  pdfReg= /\.pdf$/
  pictureReg=/\.jpeg$|\.png$|\.jpg/
  pictures: Array<any>
  UPLOAD_URL: string = environment.uploadHost
  isWriter: boolean
  ioExample: Array<{in:string,out:string}>
  @Input() _id: string;
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService,
    private auth:AuthService,
    private router: Router,
  ) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.detail.getProblem(params.get('id')).subscribe(res => {
          this.post = res; console.log(this.post);
        });
      });


    }

  checkWriter():boolean{
    return this.auth.me.info._id == this.post?.writer._id
  }

  deleteProblem():void{
    this.detail.deleteProblem(this.post._id).subscribe(console.log);
    this.router.navigateByUrl(`/contests/${this.post.contest._id}/problem`);
  }
  ngOnInit(): void {

  }

}
