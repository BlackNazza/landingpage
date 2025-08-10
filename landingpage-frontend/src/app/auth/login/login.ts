import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {UserService} from '../../user/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  serverDown = false;
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private  userService: UserService,
  ) {
    if(this.auth.getToken() != null){
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.serverDown = userService.getServerStatus();
  }

  ngOnInit(): void {
    // Google Identity SDK initialisieren
    google.accounts.id.initialize({
      client_id: '1025718420454-p8iv17rvorui62rbsl705us1tj93i6cs.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleCredential(response),
    });

    // Google Button rendern (ID im Template: googleSignInDiv)
    google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv')!,
      {
        theme: 'outline',
        size: 'large',
        width: 400, // Fest definierte Breite, wie deine anderen Buttons
        type: 'standard',
        shape: 'rectangular',
        text: 'signin_with' // Text „Über Google anmelden“
      }
    );

    // Optional: automatische Prompt zeigen
    google.accounts.id.prompt();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.loginError = err.error?.message || 'Login fehlgeschlagen';
      }
    });
  }

  continueAsGuest(): void {
    this.router.navigate(['/home']);
  }

  signup(): void {
    this.router.navigate(['/signup']);
  }

  loginWithGoogle(): void {
    google.accounts.id.prompt();
  }

  handleGoogleCredential(response: any): void {
    const idToken = response.credential;

    // Sende den Google ID Token an dein Backend
    this.http.post<{ token: string }>('/api/auth/google', { idToken }).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loginError = 'Google Login fehlgeschlagen: ' + (err.error?.message || err.message);
      }
    });
  }
}
