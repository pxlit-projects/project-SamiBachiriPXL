import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully with valid credentials', () => {
    localStorage.clear();
    const mockUsers = [{ username: 'tom', password: 'test', role: 'gebruiker' }];
    userService.getUsers.and.returnValue(mockUsers);
    component.username = 'tom';
    component.password = 'test';

    component.login();

    expect(localStorage.getItem('username')).toBe('tom');
    expect(localStorage.getItem('role')).toBe('gebruiker');
    expect(localStorage.getItem('authenticated')).toBe('true');
    expect(component.invalidCredentials).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/publishedPosts']);
  });

  it('should set invalidCredentials to true with invalid credentials', () => {
    localStorage.clear();
    const mockUsers = [{ username: 'testuser', password: 'testpass', role: 'gebruiker' }];
    userService.getUsers.and.returnValue(mockUsers);
    component.username = 'wronguser';
    component.password = 'wrongpass';

    component.login();

    expect(component.invalidCredentials).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
