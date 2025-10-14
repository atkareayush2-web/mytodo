import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserWelcomeComponent } from './userwelcome';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('UserWelcomeComponent', () => {
  let component: UserWelcomeComponent;
  let fixture: ComponentFixture<UserWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWelcomeComponent, RouterTestingModule, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
