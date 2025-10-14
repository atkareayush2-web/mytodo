import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,        // ✅ Standalone component import
        RouterTestingModule   // ✅ Needed because component uses Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logoff method', () => {
    expect(typeof component.logoff).toBe('function');
  });
});
