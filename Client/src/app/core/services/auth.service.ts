import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment'; // acessing environment variables

// constants
import { AuthAPIEndPoint } from '../constants/authAPIEndPoint';

// interfaces
import { IUserLoginCredentials, IUserRegisterationCredentials } from '../../shared/models/IAuthCredentials';
import { IAuthAPISucessfullResponse } from '../../shared/models/IAPISucessResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  private backendDomain: string = environment.BACKEND_DOMAIN;

  handelLogin(loginCredentials: IUserLoginCredentials): Observable<IAuthAPISucessfullResponse> {
    const api: string = `${this.backendDomain}${AuthAPIEndPoint.LOGIN_API}`;

    const loginAPIResponse$: Observable<IAuthAPISucessfullResponse> = this.httpClient.post<IAuthAPISucessfullResponse>(api, loginCredentials);

    return loginAPIResponse$;
  }

  handelRegister(registerCredentials: IUserRegisterationCredentials): Observable<IAuthAPISucessfullResponse> {
    const api: string = `${this.backendDomain}${AuthAPIEndPoint.REGISTER_API}`;

    const registerAPIResponse$: Observable<IAuthAPISucessfullResponse> = this.httpClient.post<IAuthAPISucessfullResponse>(api, registerCredentials);

    return registerAPIResponse$;
  }
}
