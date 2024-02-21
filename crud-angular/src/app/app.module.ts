import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './pages/compartilhado/confirmation-dialog/confirmation-dialog.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { FormBookComponent } from './pages/form-book/form-book.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrincipalComponent,
    ConfirmationDialogComponent,
    FormBookComponent,
    CreateUserComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardContent,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    CommonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
