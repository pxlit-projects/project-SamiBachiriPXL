import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  invalidCredentials: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const users = this.userService.getUsers();
    const user = users.find(user => user.username === this.username && user.password === this.password);
    if (user){
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);
      localStorage.setItem('authenticated', 'true');
      this.invalidCredentials = false;
      this.router.navigate(['/publishedPosts']);
    }
    else{
      this.invalidCredentials = true;
    }
  }
}
