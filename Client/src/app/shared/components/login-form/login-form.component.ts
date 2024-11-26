import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// interfaces
import { ILoginForm } from '../../models/IFormGroup';
import { IUserLoginCredentials } from '../../models/IAuthCredentials';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup<ILoginForm>;
  isFormSubmited: boolean = false;

  constructor() {
    this.loginForm = new FormGroup<ILoginForm>({
      email: new FormControl<string | null>('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl<string | null>('', [Validators.required])
    });
  }

  private trimAllWhiteSpaces(): void {
    const controls: (keyof ILoginForm)[] = Object.keys(this.loginForm.controls) as (keyof ILoginForm)[];
    
    controls.forEach((control) => {
      const controlValue = this.loginForm.get(control)?.value;

      // Only trim if the value is a string
      if (typeof controlValue === 'string') {
        const trimmedValue: string = controlValue.trim();
        this.loginForm.controls[control].setValue(trimmedValue);
      }
    });
  }

  onSubmit() {
    this.trimAllWhiteSpaces();

    if(this.isFormSubmited || this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    this.isFormSubmited = true;

    const loginCredentials: IUserLoginCredentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }

    console.log(loginCredentials);
  }
}
