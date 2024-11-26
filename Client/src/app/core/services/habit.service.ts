import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment'; // acessing environment variables

// constants
import { HabitAPIEndPoint } from '../constants/habitAPIEndPoint';

// interfaces
import IHabit, { IHabitCredentials } from '../../shared/models/habit.entity';
import { IHabitAPISucessfullResponseWithData } from '../../shared/models/IAPISucessResponse';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private httpClient: HttpClient = inject(HttpClient);

  private backendDomain: string = environment.BACKEND_DOMAIN;

  createNewHabit(habitCredentials: IHabitCredentials): Observable<IHabitAPISucessfullResponseWithData<IHabit>> {
    const api: string = `${this.backendDomain}${HabitAPIEndPoint.CREATE_NEW_HABIT}`;

    const createNewHabitAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit>> = this.httpClient.post<IHabitAPISucessfullResponseWithData<IHabit>>(api, habitCredentials);

    return createNewHabitAPIResponse$;
  }

  getAllHabits(): Observable<IHabitAPISucessfullResponseWithData<IHabit[]>> {
    const api: string = `${this.backendDomain}${HabitAPIEndPoint.GET_ALL_HABITS}`;

    const getAllHabitsAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit[]>> = this.httpClient.get<IHabitAPISucessfullResponseWithData<IHabit[]>>(api);

    return getAllHabitsAPIResponse$;
  }
}
