import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserResolver {
  constructor(private service: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    if (route.params && route.params['id']) {
      return this.service.findById(route.params['id']);
    }

    return of({ id: 0, login: '', password: '', role: ''});
  }
}
