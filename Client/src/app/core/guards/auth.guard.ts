import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';

// services
import { AuthService } from '../services/auth.service';

// interfaces
import { IAuthAPISucessfullResponse } from '../../shared/models/IAPISucessResponse';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isUserAuthenticatedAPIResponse$: Observable<IAuthAPISucessfullResponse> = authService.isUserAuthenticated();

  return isUserAuthenticatedAPIResponse$.pipe(
    switchMap(() => {
      return of(true); // allow user to acess the route
    }),
    catchError(() => {
      router.navigate(["/auth/login"]); // dont allow user to navigate autheticated route.

      return of(false);
    })
  );
};
