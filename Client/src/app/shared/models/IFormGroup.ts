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

export interface IBlogForm {
    title: FormControl<string | null>;
    category: FormControl<string | null>;
    content: FormControl<string | null>;
    image: FormControl<File | null>;
}