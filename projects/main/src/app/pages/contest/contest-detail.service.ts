import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../app/models/user'
import { Contest } from '../../models/contest';
import { Problem } from '../../models/problem';
import { environment } from '../../../environments/environment';
import { Response } from '../../models/response';
import { HttpClient, HttpRequest } from '@angular/common/http';

export interface PostEnrollData {
  userId: User;
  contestId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {
  private readonly CONTEST_URL = `${environment.apiHost}/contest`;
  private readonly PROBLEM_URL = `${environment.apiHost}/problem`;
  private readonly UPLOAD_URL = `${environment.uploadHost}`;
  private readonly BASE_URL = environment.apiHost;

  constructor(private router: Router,
    private http: HttpClient) {
  }
  getContest(id: string): Observable<Contest> {
    return this.http.get<Response<Contest>>(`${this.CONTEST_URL}/${id}`).pipe(map(res => res.data));
  }

  postContest(contest: Contest): Observable<Response<Contest>> {
    return this.http.post<Response<Contest>>(`${this.CONTEST_URL}`, contest)
  }
  postProblem(problem: Problem): Observable<Response<Problem>> {
    return this.http.post<Response<Problem>>(`${this.PROBLEM_URL}`, problem)
  }
  getContests(): Observable<Response<Array<Contest>>> {
    return this.http.get<Response<Array<Contest>>>(`${this.CONTEST_URL}`);
  }

  deleteContest(id: string): Observable<boolean> {
    return this.http.delete<Response<undefined>>(`${this.CONTEST_URL}/${id}`).pipe(map(res => res.success))
  }
  updateContest(m: Contest): Observable<Response<undefined>> {
    return this.http.put<Response<undefined>>(`${this.CONTEST_URL}/${m._id}`, m)
  }

  postEnrollments(userId: string, contestId: string): Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.CONTEST_URL}/enroll`, { userId, contestId }).pipe(
      map(res => res.success)
    );
  }

  getImageFromId(id: string): Promise<string> {
    return fetch(`${this.UPLOAD_URL}/${id}/download`).then(res => res.text())
  }

}
