import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SideMenuService {

  private hiddenSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  hidden$: Observable<boolean> = this.hiddenSubject.asObservable();

  constructor() { }

  set hidden(hidden: boolean) {
    this.hiddenSubject.next(hidden);
  }

  get hidden(): boolean {
    return this.hiddenSubject.value;
  }
}
