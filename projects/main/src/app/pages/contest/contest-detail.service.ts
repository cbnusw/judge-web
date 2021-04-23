import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contest } from '../../models/contest';
import { Problem } from '../../models/problem';
import { environment } from '../../../environments/environment';
import { Response } from '../../models/response';
import { HttpClient } from '@angular/common/http';
export interface Post {
  _id: any;
  title: string;
  content: string;
  file?: string;
  from: Date;
  to: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {
  private readonly CONTEST_URL = `${environment.apiHost}/contest`;
  examples: Array<Post>;

  constructor(private router: Router,
    private http:HttpClient) {
    this.examples = [
      {
        _id: 0,
        title: 'SW중심대학사업단 주최 알고리즘 대회',
        content: '사업단 연락처 043-xxx-xxxx',
        file: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
        from: new Date(2021,1,1),
        to: new Date(2021,1,3)
      }
    ];
  }
  getContest(id: number): Post {
    return this.examples[id];
  }
  getContests(): Array<Post> {
    return this.examples;
  }

  postContest(contest:Contest):Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.CONTEST_URL}`,contest).pipe(map(res =>res.success))
  }

  /* 미구현 컨트롤러
  getContest(id: number): Observable<Object>{
    return this.http.get(`${this.CONTEST_URL}/${id}`);
  }
  getContests(): Observable<Object> {
    return this.http.get(`${this.CONTEST_URL}/contest`);
  }
  postContest(post:Post):Observable<boolean> {
    const simpleObservable = new Observable<boolean>(() => {
      post._id = +this.examples[this.examples.length-1]._id + 1
      post.file = ''
      this.examples.push(post);
      this.router.navigateByUrl('/contests');
    })
    return simpleObservable.pipe(
      map(res => true)
    );
  }
  postProblem(problem:Problem):Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.CONTEST_URL}`,problem).pipe(map(res =>res.success))
  }
  deleteProblem(id: number): Observable<Object> {
    return this.http.delete(`${this.CONTEST_URL}/id`);
  }
  */
}
