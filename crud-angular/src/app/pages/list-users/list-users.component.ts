import { IUser } from './../../interfaces/iuser';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Optional } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../compartilhado/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  panelOpenState = false;
  isAdmin = this.roleValidation();
  users$: Observable<IUser[]>;
  lengthArray: number = 0;
  readonly displayedColumns = ['login', 'role', 'action'];

  filter = this.formBuilder.group({
    id: 0,
    login: [''],
    password: [''],
    role: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.users$ =this.userService.findAll();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  refresh() {
    this.users$ = this.userService.findAll();
  }

  onAdd() {
    this.router.navigate(['/new-user'], { relativeTo: this.route });
  }

  onEdit(user: IUser) {
    this.router.navigate(['/edit-user', user.id], { relativeTo: this.route });
  }

  onDelete(user: IUser) {

    let lengthArray: number =0;

this.users$.pipe(
  map(users => users.length)
).subscribe(length => {
  lengthArray = length;
  // Aqui você pode usar a variável lengthArray conforme necessário
});

    console.log(lengthArray);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse usuário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.delete(user.id).subscribe(
          () => {
            this.onRefreshFilter();
            this.snackBar.open('Usuário removido com sucesso.', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () =>
            this.snackBar.open('Erro ao remover usuário.', '', {
              duration: 5000,
            })
        );
      }
    });
  }

  onFilter() {
    const { login, role } = this.filter.value;

    this.refresh();
    this.users$ = this.users$.pipe(
      map((users) => {
        return users.filter((user) => {
          return (
            (!login || user.login.toLowerCase() === login.toLowerCase()) &&
            (!role || user.role.toLowerCase() === role.toLowerCase())
          );
        });
      })
    );
  }

  roleValidation() {
    return this.userService.roleValidation();
  }

  onRefreshFilter() {
    this.filter = this.formBuilder.group({
      id: 0,
      login: [''],
      password: [''],
      role: [''],
    });
    this.refresh();
  }
}
