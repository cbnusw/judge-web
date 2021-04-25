import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contest } from '../../models/contest';
import { Problem } from '../../models/problem';
import { environment } from '../../../environments/environment';
import { Response } from '../../models/response';
import { HttpClient, HttpRequest } from '@angular/common/http';
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
  private readonly UPLOAD_URL = `${environment.uploadHost}`;
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
  getContest(id: string): Observable<Contest>{
    return this.http.get<Response<Contest>>(`${this.CONTEST_URL}/${id}`).pipe(map(res=>res.data));
  }

  postContest(contest:Contest):Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.CONTEST_URL}`,contest).pipe(map(res =>res.success))
  }

  getContests(): Observable<Response<Array<Contest>>> {
    return this.http.get<Response<Array<Contest>>>(`${this.CONTEST_URL}`);
  }

  getImageFromId(id:string): Observable<File>{
    return this.http.get<Response<File>>(`${this.UPLOAD_URL}/${id}/download`).pipe(map(res=>res.data))

  }

}
