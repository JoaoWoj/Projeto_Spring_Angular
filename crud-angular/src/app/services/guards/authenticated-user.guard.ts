import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(){
    if (this.authService.logged) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
