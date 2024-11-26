import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// services
import { HabitService } from '../../../core/services/habit.service';

// interfaces
import { IAddHabitForm } from '../../models/IFormGroup';
import IHabit, { IHabitCredentials } from '../../models/habit.entity';
import { IHabitAPISucessfullResponseWithData } from '../../models/IAPISucessResponse';
import { IValidationError } from '../../models/IAPIError';

@Component({
  selector: 'app-modal-for-adding-habit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-for-adding-habit.component.html',
  styleUrl: './modal-for-adding-habit.component.css'
})
export class ModalForAddingHabitComponent {
  @Output() closeModal: EventEmitter<IHabit | null> = new EventEmitter();

  private habitService: HabitService = inject(HabitService);

  addHabitForm: FormGroup<IAddHabitForm>;
  isFormSubmited: boolean = false;

  constructor() {
    this.addHabitForm = new FormGroup<IAddHabitForm>({
      habitName: new FormControl<string | null>('', [Validators.required]),
      description: new FormControl<string | null>('')
    });
  }

  close(newHabit: IHabit | null = null) {
    this.closeModal.emit(newHabit);
  }

  private trimAllWhiteSpaces(): void {
    const controls: (keyof IAddHabitForm)[] = Object.keys(this.addHabitForm.controls) as (keyof IAddHabitForm)[];
    
    controls.forEach((control) => {
      const controlValue = this.addHabitForm.get(control)?.value;

      // Only trim if the value is a string
      if (typeof controlValue === 'string') {
        const trimmedValue: string = controlValue.trim();
        this.addHabitForm.controls[control].setValue(trimmedValue);
      }
    });
  }

  onSubmit() {
    this.trimAllWhiteSpaces();

    if(this.isFormSubmited || this.addHabitForm.invalid) return this.addHabitForm.markAllAsTouched();

    this.isFormSubmited = true;

    const habitCredentials: IHabitCredentials = {
      habitName: this.addHabitForm.value.habitName!,
      description: this.addHabitForm.value.description ?? ""
    }

    const createNewHabitAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit>> = this.habitService.createNewHabit(habitCredentials);

    createNewHabitAPIResponse$.subscribe({
      next: (res) => {
        this.isFormSubmited = false;
 
        this.close(res.data);
       },
       error: (err) => {
         this.isFormSubmited = false;
 
         if(!err.errorField) return;
 
         const errObj: IValidationError = err as IValidationError;
 
         this.addHabitForm.get(errObj.errorField)?.setErrors({ message: errObj.message });
 
         this.addHabitForm.markAllAsTouched();
       }
    });
  }
}
