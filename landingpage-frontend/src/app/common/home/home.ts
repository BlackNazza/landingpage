import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { User, UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  currentYear = new Date().getFullYear();

  // Dokumente in gewünschter Reihenfolge
  cards = [
    { id: 'motivation', title: '💬 Motivationsschreiben', content: 'Ich liebe es, Probleme elegant zu lösen und nutzerfreundliche UIs zu gestalten. Mein Fokus liegt auf nachhaltigem Code und sauberer Architektur.' },
    { id: 'lebenslauf', title: '🧾 Lebenslauf', content: 'Fachinformatiker AE, conLeos GmbH …', skills: ['Angular', 'TypeScript', 'Node.js', 'REST', 'Kotlin', 'Spring Boot', 'Docker', 'PostgreSQL'] },
    { id: 'arbeitszeugnis', title: '📄 Arbeitszeugnis', content: 'Note: 2,7', grade: 2.7 },
    { id: 'ihk', title: '🎓 IHK-Zeugnis', content: 'Note: 1,7', grade: 1.7 },
    { id: 'berufsschule', title: '🏫 Berufsschulzeugnis', content: 'Note: 2,3', grade: 2.3 }
  ];

  visible: Set<string> = new Set();

  constructor(public userService: UserService, public router: Router) {
    this.user$ = this.userService.user$;
    this.userService.loadUser();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    this.cards.forEach(card => {
      const el = document.getElementById(card.id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollTop;
      const elBottom = elTop + rect.height;

      // Wenn das Element im Viewport ist → sichtbar
      if (elBottom > scrollTop + 50 && elTop < scrollTop + windowHeight - 50) {
        this.visible.add(card.id);
      } else {
        // Außerhalb → wieder ausblenden
        this.visible.delete(card.id);
      }
    });
  }

  protected readonly Math = Math;
}
