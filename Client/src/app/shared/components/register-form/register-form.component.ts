import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// services
import { AuthService } from '../../../core/services/auth.service';

// interfaces
import { IRegisterForm } from '../../models/IFormGroup';
import { IUserRegisterationCredentials } from '../../models/IAuthCredentials';
import { Observable } from 'rxjs';
import { IAuthAPISucessfullResponse } from '../../models/IAPISucessResponse';
import { IValidationError } from '../../models/IAPIError';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  registerForm: FormGroup<IRegisterForm>;
  isFormSubmited: boolean = false;

  constructor() {
    this.registerForm = new FormGroup<IRegisterForm>({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    })
  }

  private trimAllWhiteSpaces(): void {
    const controls: (keyof IRegisterForm)[] = Object.keys(this.registerForm.controls) as (keyof IRegisterForm)[];
    
    controls.forEach((control) => {
      const controlValue = this.registerForm.get(control)?.value;

      // Only trim if the value is a string
      if (typeof controlValue === 'string') {
        const trimmedValue: string = controlValue.trim();
        this.registerForm.controls[control].setValue(trimmedValue);
      }
    });
  }

  private bothConfirmPasswordAndPasswordCheck() {
    const { password, confirmPassword } = this.registerForm.value;

    if(password && (password as string).length < 8) {
      this.registerForm.get('password')?.setErrors({ message: `Should contain least 8 characters.` });
    }else if(password && confirmPassword && (password !== confirmPassword)) {
      this.registerForm.get('confirmPassword')?.setErrors({ message: `Both Password doesn't match.` });
    }
  }

  onSubmit() {
    this.trimAllWhiteSpaces(); 
    this.bothConfirmPasswordAndPasswordCheck();

    if(this.isFormSubmited || this.registerForm.invalid) return this.registerForm.markAllAsTouched();

    this.isFormSubmited = true;

    const registerCredentials: IUserRegisterationCredentials = {
      userName: this.registerForm.value.userName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      confirmPassword: this.registerForm.value.confirmPassword!
    }

    const registerApiResponse$: Observable<IAuthAPISucessfullResponse> = this.authService.handelRegister(registerCredentials);

    registerApiResponse$.subscribe({
      next: (res) => {
        this.isFormSubmited = false;

        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.isFormSubmited = false;

        if(!err.errorField) return;

        const errObj: IValidationError = err as IValidationError;

        this.registerForm.get(errObj.errorField)?.setErrors({ message: errObj.message });

        this.registerForm.markAllAsTouched();
      }
    });
  }
}
