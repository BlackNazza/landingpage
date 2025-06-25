import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import {AuthService} from './auth/auth.service';
import {Home} from './common/home/home';
import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '**', redirectTo: 'login' },
  { path: '', component: AuthService },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
];
