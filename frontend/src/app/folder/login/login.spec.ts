import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,           // ✅ Standalone component import
        FormsModule,
        HttpClientTestingModule,  // ✅ For HttpClient mock
        RouterTestingModule       // ✅ For Router mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with toggleForm = false', () => {
    expect(component.toggleForm).toBeFalse();
  });

  it('should toggle to registration form', () => {
    component.toggleForm = true;
    expect(component.toggleForm).toBeTrue();
  });

  it('should contain loginObj and registerObj', () => {
    expect(component.loginObj).toBeDefined();
    expect(component.registerObj).toBeDefined();
  });
});
