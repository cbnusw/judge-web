import { AbstractControl, FormControl, FormControlName, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { SubmissionError } from './abstract-form.directive';

export interface Matched {
  path?: Array<string> | string;
  errorCode: string;
}

export class ErrorMatcher implements ErrorStateMatcher {
  private subscription: Subscription;
  private submitted: boolean;
  private submissionError: SubmissionError;

  constructor(
    submitted$: Observable<boolean>,
    submissionError$: Observable<SubmissionError>,
    private matched: Array<Matched> = [],
  ) {
    this.subscription = submitted$.subscribe(submitted => this.submitted = submitted);

    this.subscription.add(
      submissionError$.pipe(
        filter(err => !!err.message),
        distinctUntilChanged((e1, e2) => {
          const match = Array.isArray(e1.path) && Array.isArray(e2.path) ? e1.path.join('.') === e2.path.join('.') : e1.path === e2.path;
          return match && e1.message === e2.message;
        })
      ).subscribe(err => this.submissionError = err)
    );
  }

  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return this.invalid(control, form as FormGroupDirective);
  }

  clear(): void {
    this.subscription.unsubscribe();
  }

  private invalid(control: FormControl, form: FormGroupDirective): boolean {
    if (!this.submitted) {
      return false;
    }

    if (control.invalid) {
      return true;
    }

    if (this.matched.length > 0 && this.matched.some(m => form.hasError(m.errorCode, m.path))) {
      return true;
    }

    if (!this.submissionError || !this.submissionError.message) {
      return false;
    }

    const { path } = this.submissionError;

    if (path) {
      let ctl: AbstractControl;

      if (Array.isArray(path)) {
        ctl = form.form.controls[path[0]];

        path.slice(1).forEach(p => {
          if (ctl) {
            ctl = (ctl as FormGroup).controls[p];
          }
        });
      } else {
        ctl = form.form.controls[path];
      }

      if (!ctl) {
        throw new Error('Invalid form path');
      }

      return ctl === control;
    }

    return false;
  }
}
