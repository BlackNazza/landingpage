import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {Login} from './auth/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login], // HttpClientModule hier importieren
  templateUrl: './app.html',
  styleUrls: ['./app.scss']  // Korrigiert: styleUrls (nicht styleUrl)
})
export class App {
  protected title = 'LandingPageAngular';
}
