import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationTokens } from '../models/authentication-tokens';
import { Response } from '../models/response';
import { User } from '../models/user';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService, TOKEN_FLUSH_EVENT, TOKEN_SHARE_EVENT } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = environment.authHost;
  private meSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  me$: Observable<User> = this.meSubject.asObservable();

  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient,
  ) {

    if (this.loggedIn) {
      this.init();
    }
  }

  get loggedIn(): boolean {
    return !!this.storageService.get(ACCESS_TOKEN_KEY);
  }

  get me(): User {
    return this.meSubject.value;
  }

  join(user: User): Observable<boolean> {
    return this.http.post<Response<undefined>>(`${this.BASE_URL}/join`, user).pipe(
      map(res => res.success)
    );
  }
  checkDuplicate(user: User){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<{no:boolean, email:boolean, phone:boolean}>(`${this.BASE_URL}/join/check`, user, httpOptions)
    
  }

  login(no: string, password: string): Observable<boolean> {
    // TODO: 추후 실 서버로 연동
    return this.http.post<Response<AuthenticationTokens>>(`${this.BASE_URL}/login`, { no, password }).pipe(
      tap(res => {
        this.initTokens(res.data);
        this.init();
      }),
      map(res => res.success)
    );
  }

  async logout(): Promise<void> {
    const refreshToken: string = this.storageService.get(REFRESH_TOKEN_KEY);
    this.clear();
    try {
      await this.http.get(`${this.BASE_URL}/logout`, { headers: { 'x-refresh-token': refreshToken } }).toPromise();
    } catch (err) {
      console.error(err);
    }
    this.router.navigateByUrl('/account/login');
  }

  getMe(): void {
    this.http.get<Response<User>>(`${this.BASE_URL}/me`).subscribe(
      res => this.meSubject.next(res.data)
    );
  }

  private initTokens({ accessToken, refreshToken }: AuthenticationTokens): void {
    this.storageService.set(ACCESS_TOKEN_KEY, accessToken);
    this.storageService.set(REFRESH_TOKEN_KEY, refreshToken);
    this.storageService.emit(TOKEN_SHARE_EVENT, { accessToken, refreshToken });
  }

  private init(): void {
    this.getMe();
  }

  private clear(): void {
    this.storageService.clear();
    this.storageService.emit(TOKEN_FLUSH_EVENT);
    this.meSubject.next(null);
  }

}
