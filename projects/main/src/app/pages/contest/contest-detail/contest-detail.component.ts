import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Contest } from '../../../models/contest';
import { ContestDetailService, Post } from '../contest-detail.service';
import { environment } from '../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';
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
  isWriter:boolean
  constructor(
    private route: ActivatedRoute,
    private detail: ContestDetailService,
    private auth:AuthService,
    private router:Router
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.detail.getContest(params.get('id')).subscribe(res=>{this.post=res;console.log(this.post)});
    });
  }

  checkWriter():boolean{
    return this.auth.me.info._id == this.post?.writer._id
  }
  checkAttender(): boolean{
    return this.post?.attendedStudents.includes(this.auth.me.info._id)
  }

  routeToProblemList() {
    this.router.navigate([`/contests/${this.post._id}/problem`])
  }

  deleteContest():void{
    this.detail.deleteContest(this.post._id).subscribe(console.log);
    this.router.navigateByUrl('/contests');
  }
  ngOnInit(): void {

  }

}
