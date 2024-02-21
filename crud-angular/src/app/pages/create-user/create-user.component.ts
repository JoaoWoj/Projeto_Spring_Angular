import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  isAdmin: boolean = this.service.roleValidation();

  form = this.formBuilder.group({
    id: 0,
    login: ['', [Validators.required, Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
    role: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user: IUser = this.route.snapshot.data['user'];
    console.log(user);
    this.form.setValue({
      id: user.id,
      login: user.login,
      password: user.password,
      role: user.role,
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo de ${requiredLength} caracteres excedido.`;
    }

    return 'Campo inválido';
  }

  onSubmit() {
    const { login, password, role } = this.form.value;

    if (!login || !password || !role) {
      this.snackBar.open(
        'Não é possível salvar usuário com dados vazios.',
        'X',
        {
          duration: 5000,
        }
      );
    } else {
      this.service.findByLogin(login).subscribe(
        (existingLogin) => {
          console.log(existingLogin);
          if (!existingLogin) {
            this.service.save(this.form.value).subscribe(
              () => this.onSuccess(),
              () => this.onError()
            );
          } else {
            this.snackBar.open(
              'Usuário inválido.',
              'X',
              {
                verticalPosition: 'top',
                duration: 5000,
                horizontalPosition: 'center'
              }
            );
          }
        }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Livro salvo com sucesso.', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar livro.', '', { duration: 5000 });
  }
}
