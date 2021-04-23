import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly BASE_URL = environment.uploadHost;
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('upload', file);

    return this.http.post(`${this.BASE_URL}`, formData);
  }
  deleteByUrl(url: string): Observable<any> {
    return this.http.delete(`${url}`);
  }
  deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
