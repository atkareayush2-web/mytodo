import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list';
import { CommonModule } from '@angular/common'; // Needed if template uses *ngFor or *ngIf

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent, // Standalone component import
        CommonModule       // Ensure structural directives work
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UserListComponent', () => {
    expect(component).toBeTruthy();
  });
});
