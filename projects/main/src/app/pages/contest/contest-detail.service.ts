import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../app/models/user'
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/main/src/environments/environment';
import { Response } from '../../models/response';
export interface Post {
  _id: any;
  title: string;
  content: string;
  file?: string;
  from: Date;
  to: Date;
}

export interface PostEnrollData {
  userId: User,
  contestId: string
}

@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {

  examples: Array<Post>;
  private readonly BASE_URL = environment.apiHosts;

  constructor(private router: Router, private http: HttpClient) {
    this.examples = [
      {
        _id: 0,
        title: 'SW중심대학사업단 주최 알고리즘 대회',
        content: '사업단 연락처 043-xxx-xxxx',
        file: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
        from: new Date(2021, 1, 1),
        to: new Date(2021, 1, 3)
      }
    ];
  }
  getContest(id: number): Post {
    return this.examples[id];
  }
  getContests(): Array<Post> {
    return this.examples;
  }
  postContest(post: Post): Observable<boolean> {
    const simpleObservable = new Observable<boolean>(() => {
      post._id = +this.examples[this.examples.length - 1]._id + 1
      post.file = ''
      this.examples.push(post);
      this.router.navigateByUrl('/contests');
    })
    return simpleObservable.pipe(
      map(res => true)
    );
  }
  postEnrollData(post: PostEnrollData): Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.BASE_URL}/contest/contest-enroll`, post).pipe(
      map(res => res.success)
    );
  }
}
