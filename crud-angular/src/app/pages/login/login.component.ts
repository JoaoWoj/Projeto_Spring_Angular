import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/iuser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  logar(){
    if(this.formLogin.invalid) return;
    var user = this.formLogin.getRawValue() as IUser;
    this.authService.logar(user).subscribe(() => {
    },
    (error) => {
      if (error.status != 200) {
        this.snackBar.open('Falha na autenticação', 'Usuário ou password incorretos.', {
          duration: 3000
        });
      }
    }
        )
  }
}
