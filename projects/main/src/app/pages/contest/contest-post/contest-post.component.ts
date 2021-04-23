import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
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

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private detail: ContestDetailService,
    private uploadService: UploadService) {

      super(formBuilder)
      this.images = [];
      console.log(this.formGroup)
    }


  protected async processAfterSubmission(): Promise<void> {
    this.router.navigateByUrl('/contests');
  }

  protected processSubmissionError(err: HttpErrorResponse): void {
    console.error(err);
  }

  protected initFormGroup(formBuilder: FormBuilder): FormGroup {
    const formGroup = formBuilder.group({
        _id: [],
        title: ['',Validators.required],
        content: ['',Validators.required],
        registerPeriod:{
          from: ['',Validators.required],
          to: ['',Validators.required]
        },
        progressPeriod: {
          from: ['',Validators.required],//시간
          to: ['',Validators.required]
        }
      });
    return formGroup;
  }

  protected submitObservable(m: Contest): Observable<boolean> {
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

  ngOnDestroy(): void {
    super.ngOnDestroy();
    of(...this.images).pipe(
      map(image => {this.uploadService.deleteByUrl(image.url); })
    ).subscribe(()=> this.images.shift())
    this.errorMatcher.clear();
  }

}
