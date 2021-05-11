import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubmissionError } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ContestDetailService } from '../contest-detail.service';
import { DeclarationListEmitMode } from '@angular/compiler';
import { UploadService } from '../../../services/upload.service';
import { map, mergeMap } from 'rxjs/operators';
import { Contest } from '../../../models/contest';
import { Problem } from '../../../models/problem';
import { MatAccordion } from '@angular/material/expansion';
import { formatDate } from '@angular/common';
@Component({
  selector: 'sw-contest-post',
  templateUrl: './contest-post.component.html',
  styleUrls: ['./contest-post.component.scss']
})
export class ContestPostComponent extends AbstractFormDirective<Contest, Boolean> implements OnDestroy {
  subjectStep = 0;
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

  setSubjectStep(index: number) {
    this.subjectStep = index;
  }

  nextSubjectStep() {
    this.subjectStep++;
  }

  prevSubjectStep() {
    this.subjectStep--;
  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  disabled = false;
  images: Array<any>;
  problems: Array<any>;
  formGroup: FormGroup;
  isSubmitted: boolean;
  post: Contest;
  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private detail: ContestDetailService,
    private uploadService: UploadService) {
    super(formBuilder)
    this.images = [];
    this.problems = [];
    //console.log(this.formGroup);
    this.isSubmitted = false
  }


  protected async processAfterSubmission(): Promise<void> {
    this.isSubmitted = true;
  }

  protected processSubmissionError(err: HttpErrorResponse): void {
    console.error(err);
    if (this.formGroup.get('content').invalid || this.formGroup.get('title').invalid) this.step == 0;
    else if (this.formGroup.get('registerPeriod').invalid || this.formGroup.get('progressPeriod').invalid) this.step == 1;
  }

  protected initFormGroup(formBuilder: FormBuilder): FormGroup {
    const formGroup = formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      registerPeriod: formBuilder.group(
        {
          from: ['', Validators.required],
          to: ['', Validators.required]
        }
      ),
      progressPeriod: formBuilder.group(
        {
          from: ['', Validators.required],
          to: ['', Validators.required]
        }
      ),
      progressDay: ['', Validators.required],
    });
    return formGroup;
  }

  protected submitObservable(m: Contest): Observable<boolean> {
    m.progressPeriod.from = new Date(new Date(this.formGroup.get('progressDay').value.setMinutes(m.progressPeriod.from.split(':')[1])).setHours(m.progressPeriod.from.split(':')[0]))
    m.progressPeriod.to = new Date(new Date(this.formGroup.get('progressDay').value.setMinutes(m.progressPeriod.to.split(':')[1])).setHours(m.progressPeriod.to.split(':')[0]))
    m.pictures = []
    this.images.map(a => m.pictures.push({ url: a._id }))
    //console.log(m);
    this.subjectStep = 1;
    return this.detail.postContest(m).pipe(map(res => { this.post = res.data; return res.success; }))
  }


  handleFiles(files: File[]): void {
    of(...files).pipe(
      mergeMap(file => this.uploadService.upload(file))
    ).subscribe(res => {
      this.images.push(res);
      //console.log(this.images);
    })
  }

  deleteImage(image: any): void {
    this.uploadService.deleteById(image._id).subscribe((res) => { //console.log(res);
      alert(`${image.filename} 업로드를 취소하였습니다.`); this.images.splice(this.images.indexOf(image));
    });
  }


  ngDoCheck() {

  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
    //console.log(this.images);
    if (!this.isSubmitted)
      of(...this.images).pipe(
        map(image => image._id)
      ).subscribe(this.uploadService.deleteById)
    this.errorMatcher.clear();
  }
  finalApply(){
    this.detail.updateContest(this.post).subscribe(res=>this.router.navigateByUrl('/contests'));

  }
  addProblem(id:string):void {
    this.post.problems.push(id);
    //console.log(this.post);
    this.nextSubjectStep();
  }
}
