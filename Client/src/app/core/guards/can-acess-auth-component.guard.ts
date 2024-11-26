import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';

// services
import { AuthService } from '../services/auth.service';
import { IAuthAPISucessfullResponse } from '../../shared/models/IAPISucessResponse';

export const canAcessAuthComponentGuard: CanActivateChildFn = (childRoute, state) => {
  console.log("hy");
  
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isUserAuthenticatedAPIResponse$: Observable<IAuthAPISucessfullResponse> = authService.isUserAuthenticated();

  return isUserAuthenticatedAPIResponse$.pipe(
    switchMap(() => {
      router.navigate(["/"]); // dont allow user to navigate login / register route.

      return of(false); 
    }),
    catchError(() => {
      return of(true); // allow user to acess the route
    })
  );
};
