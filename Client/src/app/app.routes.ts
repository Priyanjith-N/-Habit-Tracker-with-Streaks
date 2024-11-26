import { Routes } from '@angular/router';

// guards
import { canAcessAuthComponentGuard } from './core/guards/can-acess-auth-component.guard';
import { authGuard } from './core/guards/auth.guard';

// components
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { DiplayCurrentHabitsOverviewComponent } from './shared/components/diplay-current-habits-overview/diplay-current-habits-overview.component';

export const routes: Routes = [
    {
        path: "auth",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
    {
        path: "auth",
        component: AuthPageComponent,
        canActivateChild: [canAcessAuthComponentGuard],
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
    {
        path: "",
        component: HomePageComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: "",
                component: DiplayCurrentHabitsOverviewComponent
            }
        ]
    }
];