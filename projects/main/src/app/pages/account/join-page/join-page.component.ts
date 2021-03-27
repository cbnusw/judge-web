import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { ERROR_CODES } from '../../../constants/error-codes';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';


export const confirmPasswordValidator: ValidatorFn = control => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;
  return confirmPassword && password !== confirmPassword ? { confirmPassword: true } : null;

};

@Component({
  selector: 'sw-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})

export class JoinPageComponent extends AbstractFormDirective<User, boolean> implements OnDestroy {

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  confirmPasswordMatcher = new ErrorMatcher(this.submitted$, this.submissionError$, [{ errorCode: 'confirmPassword' }]);

  constructor(
    private authService: AuthService,
    private router: Router,
    formBuilder: FormBuilder,
  ) {
    super(formBuilder);
  }

  protected async processAfterSubmission(): Promise<void> {
    this.router.navigateByUrl('/account/login');
  }

  protected processSubmissionError(err: HttpErrorResponse): void {
    console.error(err);
    switch (err.error.code) {
      case ERROR_CODES.REG_NUMBER_USED:
        this.submissionError = { path: 'no', message: '이미 등록된 교번 또는 학번입니다.' };
        break;
      case ERROR_CODES.PHONE_NUMBER_USED:
        this.submissionError = { path: ['info', 'phone'], message: '이미 사용 중인 휴대폰번호입니다.' };
        break;
      case ERROR_CODES.EMAIL_USED:
        this.submissionError = { path: ['info', 'email'], message: '이미 사용 중인 이메일주소입니다.' };
        break;
    }
  }

  protected initFormGroup(formBuilder: FormBuilder): FormGroup {
    const PASSWORD_PATTERN = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,}$/;
    const NAME_PATTERN = /^[A-Za-z가-힣_\-]{2,}$/;
    const PHONE_NUMBER_PATTERN = /^01([0|1|6|7|8|9]?)([0-9]{7,8})$/;

    const formGroup = formBuilder.group({
      no: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$|^[0-9]{10}$/)]],
      password: [null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      confirmPassword: [null, [Validators.required]],
      info: formBuilder.group({
        name: [null, [Validators.required, Validators.pattern(NAME_PATTERN)]],
        email: [null, [Validators.required, Validators.email]],
        phone: [null, [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)]],
        department: [null, [Validators.required]]
      })
    });

    formGroup.setValidators([confirmPasswordValidator]);

    return formGroup;
  }

  protected submitObservable(m: User): Observable<boolean> {
    return this.authService.join(m);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.errorMatcher.clear();
    this.confirmPasswordMatcher.clear();
  }
}
