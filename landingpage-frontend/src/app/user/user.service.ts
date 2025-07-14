import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  email: string;
  profileImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  loadUser(): Observable<User> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(
      'http://localhost:8080/api/users/me',
      { headers }
    ).pipe(
      tap(user => this.userSubject.next(user))
    );
  }



  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
