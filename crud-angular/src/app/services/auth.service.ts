import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API = 'api/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  logar(user: IUser){
    return this.httpClient.post<any>(`${this.API}` + '/login', user).pipe(
      tap((record) => {
        if (record){
          localStorage.setItem('token', btoa(JSON.stringify(record['token'])));
          localStorage.setItem('login', btoa(JSON.stringify(record['login'])));
          localStorage.setItem('role', btoa(JSON.stringify(record['role'])));
          localStorage.setItem('id', btoa(JSON.stringify(record['id'])));
          this.router.navigate(['']);
        } else {
          return record;
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get getUserLogged(): IUser | null {
    const loginString = localStorage.getItem('login');
    if (loginString) {
      return JSON.parse(atob(loginString));
    } else {
      return null;
    }
  }
  get getIdUserLogged(): number | null {
    const idString = localStorage.getItem('id');
    if (idString) {
      return JSON.parse(atob(idString));
    }
    return null;
  }

  get getTokenUser(): string | null {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      return JSON.parse(atob(tokenString));
    }
    return null;
  }
  get logged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
