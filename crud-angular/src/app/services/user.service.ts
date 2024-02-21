import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly API = 'api/users';
  private readonly token = localStorage.getItem('token');
  private readonly isAdmin = this.roleValidation();

  constructor(private httpClient: HttpClient, private router: Router,
    private route: ActivatedRoute) {}

  findAll() {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.get<IUser[]>(this.API,{headers});
  }

  findById(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.get<IUser>(`${this.API}/${id}`,{headers});
  }

  findByLogin(login: string){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.get<IUser>(`${this.API}/login/${login}`,{headers});
  }

  save(user: Partial<IUser>){
    if(user.id){
      return this.update(user);
    }
    return this.create(user);
  }

  private create(user: Partial<IUser>){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.post<IUser>(this.API, user,{headers});

  }

  private update(user: Partial<IUser>){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.put<IUser>(`${this.API}/${user.id}`, user,{headers});
  }

  delete(id: number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +this.token} );
    return this.httpClient.delete(`${this.API}/${id}`,{headers});
  }


  Users() {
      this.router.navigate(['user']);
  }

  roleValidation() {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      const decodedRole = atob(storedRole);
      return JSON.parse(decodedRole) === "ADMIN";
    }
    return false;
  }

}
