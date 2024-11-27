import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

// services
import { AuthService } from '../../services/auth.service';

// interfaces
import { IAuthAPISucessfullResponse } from '../../../shared/models/IAPISucessResponse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  logOut() {
    const logoutApiResponse$: Observable<IAuthAPISucessfullResponse> = this.authService.handelLogout();

    logoutApiResponse$.subscribe({
      next: (res) => {
        this.router.navigate(["/auth/login"]);
      },
      error: (err) => {  }
    });
  }
}
