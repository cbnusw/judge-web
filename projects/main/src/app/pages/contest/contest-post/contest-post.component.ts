import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SubmissionError } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ERROR_CODES } from '../../../constants/error-codes';
import { ContestDetailService, Post } from '../contest-detail.service';
import { DeclarationListEmitMode } from '@angular/compiler';
@Component({
  selector: 'sw-contest-post',
  templateUrl: './contest-post.component.html',
  styleUrls: ['./contest-post.component.scss']
})
export class ContestPostComponent extends AbstractFormDirective<Post, boolean> implements OnDestroy {
  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  formGroup: FormGroup;
  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private detail: ContestDetailService) {
      super(formBuilder)
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
        file: [],
        from: ['',Validators.required],
        to: ['',Validators.required],
      });
    return formGroup;
  }

  protected submitObservable(m: Post): Observable<boolean> {
    return this.detail.postContest(m);
    
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.errorMatcher.clear();
  }

}
