import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import {AuthService} from './auth/auth.service';
import {Home} from './common/home/home';
import {authGuard} from './auth/auth.guard';
import {Signup} from './auth/signup/signup';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'signup', component: Signup},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

//{ path: 'home', component: Home, canActivate: [authGuard] },
//BENUTZEN WENN SACHEN NUR FÜR USER SIND

