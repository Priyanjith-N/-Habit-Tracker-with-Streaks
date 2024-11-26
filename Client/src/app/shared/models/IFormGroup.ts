import { FormControl } from "@angular/forms";

export interface ILoginForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}

export interface IRegisterForm {
    userName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
}

export interface IAddHabitForm {
    habitName: FormControl<string | null>;
    description: FormControl<string | null>;
}