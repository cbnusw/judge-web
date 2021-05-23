import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RequestBase } from '../classes/request-base';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends RequestBase {
  constructor(private http: HttpClient) {
    super(environment.apiHost);
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('upload', file);

    return this.http.post(this.url`/upload`, formData);
  }
}
