import { Routes } from '@angular/router';

// components
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';

export const routes: Routes = [
    {
        path: "auth",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
    {
        path: "auth",
        component: AuthPageComponent,
        children: [
            {
                path: "login",
                component: LoginFormComponent
            },
            {
                path: "register",
                component: RegisterFormComponent
            }
        ]
    },
];