import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReviewComponent } from './review.component';
import { ReviewService } from '../review.service';
import { ReviewRequest } from '../models/reviewRequest.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'router-link',
  template: ''
})
class RouterLinkStub {}

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let reviewService: jasmine.SpyObj<ReviewService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['createReview']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReviewComponent, NavigationBarComponent],
      providers: [
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      declarations: [RouterLinkStub]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create review and navigate to allPosts on success', () => {
    const mockReviewRequest: ReviewRequest = { content: 'Test content', editor: 'Test editor', approved: true };
    reviewService.createReview.and.returnValue(of({}));

    component.createReview(true);

    expect(reviewService.createReview).toHaveBeenCalledWith(mockReviewRequest, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/allPosts']);
  });

  it('should handle error when creating review', () => {
    reviewService.createReview.and.returnValue(throwError('Error creating review'));
    spyOn(console, 'error');

    component.createReview(true);

    expect(reviewService.createReview).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error submitting review', 'Error creating review');
  });
});
