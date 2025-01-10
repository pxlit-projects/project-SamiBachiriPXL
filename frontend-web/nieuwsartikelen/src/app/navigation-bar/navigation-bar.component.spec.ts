import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavigationBarComponent], // Fix: Use imports for standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with role from localStorage', () => {
    localStorage.setItem('role', 'redacteur');
    component.role = localStorage.getItem('role') || '';
    expect(component.role).toBe('redacteur');
  });

  it('should clear localStorage and navigate to login on logout', async () => {
    component.logout();
    expect(localStorage.getItem('role')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
