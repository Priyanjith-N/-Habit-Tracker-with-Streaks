import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// interfaces
import { IAddHabitForm } from '../../models/IFormGroup';
import { IHabitCredentials } from '../../models/habit.entity';

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
  @Output() closeModal: EventEmitter<null> = new EventEmitter();

  addHabitForm: FormGroup<IAddHabitForm>;
  isFormSubmited: boolean = false;

  constructor() {
    this.addHabitForm = new FormGroup<IAddHabitForm>({
      habitName: new FormControl<string | null>('', [Validators.required]),
      description: new FormControl<string | null>('')
    });
  }

  close() {
    this.closeModal.emit();
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

    console.log(habitCredentials);
  }
}
