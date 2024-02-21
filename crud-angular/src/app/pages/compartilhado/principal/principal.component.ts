import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  isAdmin: boolean = this.userService.roleValidation();

  isUserClass =false;

  ngOnInit(): void {
    this.isUserClass = this.router.routerState.snapshot.url.toString().match('user') ? true : false;
  }

  onHome(){
    this.router.navigate(['']);
  }

  onEdit(){
    const id = this.authService.getIdUserLogged;
    console.log(id);
    if(id) {
      this.router.navigate(['/edit-user', id], { relativeTo: this.route });
    } else {
      this.onLogout();
    }

  }

  onLogout() {
    this.authService.logout();
  }

  onCreate() {
    this.userService.Users();
  }
}
