import { Component, OnInit } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import { UserService, User } from '../../user/user.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav implements OnInit {
  dropdownOpen = false;
  user$: Observable<User | null>;

  constructor(public userService: UserService, public router: Router) {
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.loadUser().subscribe(tmp => console.log(tmp));
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  home() {
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
