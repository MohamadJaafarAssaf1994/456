import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* =========================
     INITIAL STATE
     ========================= */

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({
      username: 'demo',
      password: 'demo',
    });
  });

  /* =========================
     FORM VALIDATORS
     ========================= */

  it('should have required validators on username and password', () => {
    const usernameCtrl = component.form.get('username');
    const passwordCtrl = component.form.get('password');

    usernameCtrl?.setValue('');
    passwordCtrl?.setValue('');

    expect(usernameCtrl?.valid).toBeFalse();
    expect(passwordCtrl?.valid).toBeFalse();
  });

  /* =========================
     SUBMIT BEHAVIOR
     ========================= */

  it('should emit submitForm with username and password when submitted', () => {
    spyOn(component.submitForm, 'emit');

    component.form.setValue({
      username: 'john_doe',
      password: 'secret',
    });

    component.submit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      username: 'john_doe',
      password: 'secret',
    });
  });
});
