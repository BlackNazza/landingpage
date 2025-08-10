import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Nav} from '../nav/nav';
import {Footer} from '../footer/footer';
import {User, UserService} from '../../user/user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  protected user$: Observable<User | null>;
  user: User | null = null;

  constructor(public userService: UserService, public router: Router) {
    this.user$ = this.userService.user$;
    this.userService.loadUser();
  }

  currentYear = new Date().getFullYear();

  //TODO: Change with Database informations, connected to the profile...
  lebenslauf = {
    name: 'Gabriel Nikolai Doege',
    beruf: 'Fachinformatiker - IT-Anwendungsentwickler',
    erfahrung: '+3 Jahre in Frontend & Backend (Ausbildung)',
    Berufserfahrung: '< 3',
    skills: ['Angular', 'TypeScript', 'Node.js', 'REST', 'Kotlin', 'Spring Boot', 'Docker', 'Postgresql']
  };

  arbeitszeugnis = {
    studiengang: 'Informatik B.Sc.',
    note: '1,7',
    schwerpunkte: ['Webentwicklung', 'Datenbanken', 'Softwarearchitektur']
  };

  motivation = {
    text: 'Ich liebe es, Probleme elegant zu lösen und nutzerfreundliche UIs zu gestalten. Mein Fokus liegt auf nachhaltigem Code und sauberer Architektur.',
    coding: [
      'Dark-Mode Switch in Angular implementiert',
      'E2E-Tests mit Cypress geschrieben',
      'RxJS in komplexen Formularen angewendet'
    ]
  };

  projects = [
    { name: 'Portfolio Website', desc: 'Persönliche Seite mit Angular', link: 'https://example.com' },
    { name: 'KI-Bildgenerator', desc: 'OpenAI API + Angular', link: 'https://example.com' },
    { name: 'ToDo App', desc: 'Mit LocalStorage & JWT-Auth', link: '#' }
  ];
}
