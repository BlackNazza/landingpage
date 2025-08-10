import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subscription, throwError, timer} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

export interface User {
  username: string;
  email: string;
  profileImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private serverDown = false;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    //maybe i can safe code with loadUser in constructor
  }

  loadUser(): Observable<User> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>('http://localhost:8080/api/users/me', { headers }).pipe(
      tap(user => this.userSubject.next(user)),
      tap(() => this.serverDown = false), // Server erreichbar
      catchError(err => {
        // Fehler analysieren
        if (err.status === 0) {
          // Verbindung zum Server fehlgeschlagen (Netzwerkfehler, keine Verbindung)
          this.serverDown = true;
        } else if (err.status === 403) {
          // Backend sagt: Ressource nicht gefunden, Server läuft aber
          this.serverDown = false;  // Server ist erreichbar, nur Ressource nicht da
        } else
        {
          this.serverDown = false;
        }

        return throwError(() => err); // Fehler weitergeben
      })
    );


  }

  unloadUser(): void {
    this.userSubject.next(null); // User zurücksetzen
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  getServerStatus(): boolean {
    return this.serverDown;
  }
}
