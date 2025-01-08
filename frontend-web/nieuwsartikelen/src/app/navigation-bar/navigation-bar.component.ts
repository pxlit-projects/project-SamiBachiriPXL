import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  role: string = localStorage.getItem('role') || '';
  isRedacteur: boolean = this.role === 'redacteur';
  constructor(private router: Router) {}

  logout() {
    console.log(this.role + ' logged out');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
