import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { Contest } from '../../../models/contest';
import { Problem, Io } from '../../../models/problem';
import { UploadService } from '../../../services/upload.service';
import { ContestDetailService } from '../contest-detail.service';
import { MatAccordion } from '@angular/material/expansion';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'sw-problem-post',
  templateUrl: './problem-post.component.html',
  styleUrls: ['./problem-post.component.scss']
})
export class ProblemPostComponent extends AbstractFormDirective<Problem, boolean> implements OnDestroy {


  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  @ViewChild(MatAccordion) accordion: MatAccordion;
  disabled = false;
  inReg= /\.in$/
  outReg= /\.out$/
  exampleIos: Array<Io> = []
  previewExampleIos: Array<Io> = []
  Ios: Array<Io> = []
  @Input() contest:Contest;
  @Output() posted: EventEmitter<string> = new EventEmitter<string>();
  updateProblem(id:string){
    this.posted.emit(id);
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private router:Router,
    formBuilder:FormBuilder,
    private upload:UploadService,
    private detail:ContestDetailService,
    private http:HttpClient) {
      super(formBuilder);
      this.exampleIos = [];
      this.Ios = []
    }


    protected initFormGroup(formBuilder: FormBuilder): FormGroup {
      const formGroup = formBuilder.group({
        title: ['',Validators.required],
        content: formBuilder.group({
          explainProblem: ['',Validators.required],
          explainInput: ['', Validators.required],
          explainOutput: ['',Validators.required]
        })
      })
      return formGroup;
    }

    protected submitObservable(m: Problem): Observable<boolean> {
      m.content.ioSample = this.exampleIos;
      m.io = this.Ios
      m.contest = this.contest._id;
      return this.detail.postProblem(m).pipe(map(res=>{this.updateProblem(res.data._id); return res.success}));
    }

    handleExampleIo(files: File[], ): void {
      of(...files).pipe(
        mergeMap(file => this.upload.upload(file))
      ).subscribe(res => {
        const index = +res.filename.split('.')[0]-1;
        if(this.exampleIos[index] == undefined){
          this.exampleIos[index] = {in: undefined, out: undefined}}
        if(this.inReg.test(res.filename)){
        this.exampleIos[index].in = res._id;}
        else if(this.outReg.test(res.filename))
        this.exampleIos[index].out = res._id;
        if(this.exampleIos[index].in != undefined && this.exampleIos[index].out != undefined)
        {this.previewExampleIos[index] = {in: undefined, out: undefined}
          this.detail.getImageFromId(this.exampleIos[index].in).then(res=>{this.previewExampleIos[index]['in'] = res})
        this.detail.getImageFromId(this.exampleIos[index].out).then(res=>{this.previewExampleIos[index]['out'] = res})}
      })
    }
    handleIo(files: File[], ): void {
      of(...files).pipe(
        mergeMap(file => this.upload.upload(file))
      ).subscribe(res => {
        const index = +res.filename.split('.')[0] - 1;
        if(this.Ios[index] == undefined)this.Ios[index] = {in: undefined, out: undefined}
        if(this.inReg.test(res.filename))
        this.Ios[index].in = res._id;
        else if(this.outReg.test(res.filename))this.Ios[index].out = res._id;
        console.log(this.Ios, res);
      })
    }

  ngOnInit(): void {
  }

}
