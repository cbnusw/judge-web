import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubmissionError } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ContestDetailService, Post } from '../contest-detail.service';
import { DeclarationListEmitMode } from '@angular/compiler';
import { UploadService } from '../../../services/upload.service';
import { map, mergeMap } from 'rxjs/operators';
import { Contest} from '../../../models/contest';
import { Problem} from '../../../models/problem';
@Component({
  selector: 'sw-contest-post',
  templateUrl: './contest-post.component.html',
  styleUrls: ['./contest-post.component.scss']
})
export class ContestPostComponent extends AbstractFormDirective<Contest, boolean> implements OnDestroy {
  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  disabled = false;
  images: Array<any>;
  formGroup: FormGroup;
  isSubmitted: boolean;
  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private detail: ContestDetailService,
    private uploadService: UploadService) {
      super(formBuilder)
      this.images = [];
      console.log(this.formGroup);
      this.isSubmitted = false
    }


  protected async processAfterSubmission(): Promise<void> {
    this.isSubmitted = true;
    this.router.navigateByUrl('/contests');
  }

  protected processSubmissionError(err: HttpErrorResponse): void {
    console.error(err);
  }

  protected initFormGroup(formBuilder: FormBuilder): FormGroup {
    const formGroup = formBuilder.group({
        title: ['',Validators.required],
        content: ['',Validators.required],
        registerPeriod: formBuilder.group(
          {
            from: ['',Validators.required],
            to: ['',Validators.required]
          }
        ),
        progressPeriod: formBuilder.group(
          {
            from: ['',Validators.required],
            to: ['',Validators.required]
          }
        ),
        progressDay: ['', Validators.required]
      });
    return formGroup;
  }

  protected submitObservable(m: Contest): Observable<boolean> {
    m.progressPeriod.from = new Date(new Date(this.formGroup.get('progressDay').value.setMinutes(m.progressPeriod.from.split(':')[1])).setHours(m.progressPeriod.from.split(':')[0]))
    m.progressPeriod.to = new Date(new Date(this.formGroup.get('progressDay').value.setMinutes(m.progressPeriod.to.split(':')[1])).setHours(m.progressPeriod.to.split(':')[0]))
    m.pictures = []
    this.images.map(a=>m.pictures.push({url:a._id}))
    console.log(m);
    return this.detail.postContest(m);
  }


  handleFiles(files: File[]): void {
    of(...files).pipe(
      mergeMap(file => this.uploadService.upload(file))
    ).subscribe(res => {
      this.images.push(res);
      console.log(this.images);
    })
  }

  deleteImage(image:any): void{
    this.uploadService.deleteById(image._id).subscribe((res) => {console.log(res);alert(`${image.filename} 업로드를 취소하였습니다.`); this.images.splice(this.images.indexOf(image));});
  }


  ngDoCheck(){

  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
    console.log(this.images);
    if (!this.isSubmitted)
      of(...this.images).pipe(
        map(image => {this.uploadService.deleteById(image._id);})
      ).subscribe(console.log)
    this.errorMatcher.clear();
  }

}
