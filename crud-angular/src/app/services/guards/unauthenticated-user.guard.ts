import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedUserGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(){
    if (this.authService.logged) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
