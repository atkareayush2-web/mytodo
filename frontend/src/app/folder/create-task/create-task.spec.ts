import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task'; // ✅ Use the actual component class name

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  // -------------------------------------------
  // This block runs before each test
  // -------------------------------------------
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskComponent] // ✅ Standalone component import
    })
    .compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;

    // Trigger initial data binding
    fixture.detectChanges();
  });

  // -------------------------------------------
  // Basic test: Component should be created successfully
  // -------------------------------------------
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
