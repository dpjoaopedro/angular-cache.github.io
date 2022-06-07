import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, ReplaySubject, share, Subject, timer } from 'rxjs';
import { User } from './models/user';

const CACHE_TIMEOUT = 10000;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = this.httpClient
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => merge(timer(CACHE_TIMEOUT), this.cleanUsers$),
      })
    );

  private cleanUsers$ = new Subject();

  constructor(private httpClient: HttpClient) {}

  cleanCache() {
    this.cleanUsers$.next(true);
  }
}
