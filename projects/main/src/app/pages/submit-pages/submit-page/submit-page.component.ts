import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective } from '../../../classes/abstract-form.directive';
import { ErrorMatcher } from '../../../classes/error-matcher';
import { PROGRAMMING_LANGUAGES } from '../../../constants';
import { IContest } from '../../../models/contest';
import { IFile } from '../../../models/file';
import { IProblem } from '../../../models/problem';
import { ISubmit } from '../../../models/submit';
import { ContestService } from '../../../services/apis/contest.service';
import { ProblemService } from '../../../services/apis/problem.service';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'sw-submit-page',
  templateUrl: './submit-page.component.html',
  styleUrls: ['./submit-page.component.scss']
})
export class SubmitPageComponent extends AbstractFormDirective<ISubmit, boolean> implements OnInit {

  contest: IContest;
  problem: IProblem;
  languages = PROGRAMMING_LANGUAGES;

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(public auth: AuthService,
              public layout: LayoutService,
              private problemService: ProblemService,
              private contestService: ContestService,
              private uploadSerivce: UploadService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {
    super(fb);
  }


  protected async mapToModel(m: ISubmit): Promise<ISubmit> {
    m.source = (m.source as IFile).url;
    return m;
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert('문제에 대한 소스코드를 제출하였습니다.\n채점이 완료되면 알림이 옵니다.');
    const queryParams: Params = {};
    if (this.contest) {
      queryParams.contest = this.contest._id;
    }
    if (this.problem) {
      queryParams.problem = this.problem._id;
    }
    await this.router.navigate(['/submit/list'], { queryParams });
  }

  get sourceFilename(): string {
    const file: IFile = this.formGroup.get('source').value;
    if (file) {
      return file.filename;
    }
    return null;
  }

  changeSourceFile(files: File[]): void {
    const file = files[0];
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }
    this.uploadSerivce.upload(file).subscribe(
      res => this.formGroup.get('source').setValue(res.data)
    );
  }

  cancel(): void {
    const queryParams: Params = {};
    if (this.contest) {
      queryParams.contest = this.contest._id;
    }
    this.router.navigate(['/problem/detail', this.problem._id], { queryParams });
  }

  protected initFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      contest: [null],
      problem: [null, [Validators.required]],
      source: [null, [Validators.required]],
      language: [null, [Validators.required]],
    });
  }

  protected submitObservable(m: ISubmit): Observable<boolean> {
    return this.problemService.submit(this.problem._id, m).pipe(map(res => res.success));
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.addSubcription(
      this.route.queryParams.pipe(
        map(params => params.contest),
        switchMap(id => id ? this.contestService.getContest(id) : of({ data: null })),
      ).subscribe(
        res => {
          this.contest = res.data;
          if (this.contest) {
            this.formGroup.get('contest').setValue(this.contest._id);
          }
        }
      ),
      this.route.queryParams.pipe(
        map(params => params.problem),
        switchMap(id => id ? this.problemService.getProblem(id) : of({ data: null }))
      ).subscribe(
        res => {
          this.problem = res.data;
          if (this.problem) {
            this.formGroup.get('problem').setValue(this.problem._id);
          }
        },
        err => {
          alert(`문제에 접근할 제출 권한이 없습니다.\n${err.error && err.error.message || err.message}`);
          this.router.navigateByUrl('/');
        }
      )
    );
  }
}
