import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, StorageService } from '../services/storage.service';
import { ERROR_CODES } from '../constants/error-codes';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = this.addToken(request);

    return next.handle(request).pipe(
      catchError(err => {
        if (err.error.code === ERROR_CODES.ACCESS_TOKEN_EXPIRED) {
          return this.refreshToken(request, next);
        } else if (err.error.status === 401) {
          this.router.navigateByUrl('/account/login');
        }
        return throwError(err);
      })
    );
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token: string = this.storageService.get(ACCESS_TOKEN_KEY);
    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return request;
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
    }

    // TODO: 여기에 인증 서버 URL 추가
    const url = `${environment.authHost}/token/refresh`;

    return from(
      fetch(url, {
        method: 'GET',
        headers: {
          'x-refresh-token': this.storageService.get(REFRESH_TOKEN_KEY)
        }
      }).then(res => res.json())
    ).pipe(
      switchMap(res => {
        const { accessToken, refreshToken } = res.data;
        this.storageService.set(ACCESS_TOKEN_KEY, accessToken);
        this.storageService.set(REFRESH_TOKEN_KEY, refreshToken);
        this.isRefreshing = false;
        this.refreshTokenSubject.next(accessToken);
        return next.handle(this.addToken(request));
      })
    );
  }
}
