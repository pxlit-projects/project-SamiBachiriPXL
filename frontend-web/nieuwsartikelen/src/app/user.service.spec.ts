import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from './models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of users', () => {
    const expectedUsers: User[] = [
      { username: 'sami', password: 'test', role: 'redacteur' },
      { username: 'sander', password: 'test', role: 'reviewer' },
      { username: 'tom', password: 'test', role: 'commenter' }
    ];

    const users = service.getUsers();
    expect(users).toEqual(expectedUsers);
  });
});
