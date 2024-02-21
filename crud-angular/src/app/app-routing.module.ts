import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthenticatedUserGuard } from './services/guards/unauthenticated-user.guard';
import { AuthenticatedUserGuard } from './services/guards/authenticated-user.guard';
import { BookResolver } from './core/guards/book.resolver';
import { FormBookComponent } from './pages/form-book/form-book.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserResolver } from './core/guards/user.resolver';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate: [UnauthenticatedUserGuard]},
  {
    path: '', component: PrincipalComponent, canActivate: [AuthenticatedUserGuard],
    children: [
      {path:'', component: HomeComponent},
      {path:'user', component: ListUsersComponent},
      {path:'new-user', component: CreateUserComponent, resolve:{user: UserResolver}},
      {path:'new', component: FormBookComponent, resolve:{book: BookResolver}},
      {path:'edit/:id', component: FormBookComponent, resolve:{book: BookResolver}},
      {path:'view/:id', component: FormBookComponent, resolve:{book: BookResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
