import { HttpClient } from '@angular/common/http';
import { IndexingContext } from '@angular/compiler-cli/src/ngtsc/indexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiBase } from '../../classes/api-base';
import { IContest } from '../../models/contest';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class ContestService extends ApiBase {

  constructor(private http: HttpClient) {
    super(environment.apiHost, '/contest');
  }

  search(params?: IParams): Observable<IListResponse<IContest>> {
    return this.http.get<IListResponse<IContest>>(this.url`/`, { params: ApiBase.params(params) });
  }

  searchMyContests(params?: IParams): Observable<IListResponse<IContest>> {
    return this.http.get<IListResponse<IContest>>(this.url`/me`, { params: ApiBase.params(params) });
  }

  getApplyingContests(): Observable<IListResponse<IContest>> {
    return this.http.get<IListResponse<IContest>>(this.url`/applying`);
  }

  getContest(id: string): Observable<IResponse<IContest>> {
    return this.http.get<IResponse<IContest>>(this.url`/${id}`);
  }

  createContest(body: IContest): Observable<IResponse<IContest>> {
    return this.http.post<IResponse<IContest>>(this.url`/`, body);
  }

  enrollContest(id: string): Observable<IResponse<undefined>> {
    return this.http.post<IResponse<undefined>>(this.url`/${id}/enroll`, null);
  }

  unenrollContest(id: string): Observable<IResponse<undefined>> {
    return this.http.post<IResponse<undefined>>(this.url`/${id}/unenroll`, null);
  }

  updateContest(id: string, body: IContest): Observable<IResponse<undefined>> {
    return this.http.put<IResponse<undefined>>(this.url`/${id}`, body);
  }

  removeContest(id: string): Observable<IResponse<undefined>> {
    return this.http.delete<IResponse<undefined>>(this.url`/${id}`);
  }
}
