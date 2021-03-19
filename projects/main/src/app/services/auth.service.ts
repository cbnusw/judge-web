import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationTokens } from '../models/authentication-tokens';
import { User } from '../models/user';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService, TOKEN_FLUSH_EVENT, TOKEN_SHARE_EVENT } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [];
  private meSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  me$: Observable<User> = this.meSubject.asObservable();

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {

    // TODO: 추후 삭제
    fetch('/assets/test/users.json')
      .then(res => res.json())
      .then(users => this.users = users);

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
    // TODO: 추후 실 서버와 연동
    if (this.users.find(u => u.no === user.no)) {
      throw new Error('REG_NUMBER_USED');
    }
    this.users.push(user);
    return of(true);
  }

  login(no: string, password: string): Observable<boolean> {
    // TODO: 추후 실 서버로 연동
    return of(this.users).pipe(
      map(users => {
        const index = users.findIndex(u => u.no === no);
        if (index === -1) {
          throw new Error('USER_NOT_FOUND');
        }
        const user = users[index];
        if (user.password !== password) {
          throw new Error('INVALID_PASSWORD');
        }
        return index;
      }),
      tap(index => {
        this.initTokens({ accessToken: `${index}`, refreshToken: `${index}` });
        this.init();
      }),
      map(() => true)
    );
  }

  async logout(): Promise<void> {
    // TODO: 추후 실서버로 로그아웃 요청 보내는 것 추가
    this.clear();
    this.router.navigateByUrl('/account/login');
  }

  getMe(): void {
    const index = this.storageService.get(ACCESS_TOKEN_KEY);
    this.meSubject.next(this.users[+index]);
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
