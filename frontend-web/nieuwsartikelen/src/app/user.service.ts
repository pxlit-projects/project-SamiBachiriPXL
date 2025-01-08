import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { username: 'sami', password: 'test', role: 'redacteur' },
    { username: 'sander', password: 'test', role: 'reviewer' },
    { username: 'tom', password: 'test', role: 'commenter' }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
