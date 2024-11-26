import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

// componets
import { ModalForAddingHabitComponent } from '../modal-for-adding-habit/modal-for-adding-habit.component';
import { TodaysOverviewOfHabitsComponent } from '../todays-overview-of-habits/todays-overview-of-habits.component';

// services
import { HabitService } from '../../../core/services/habit.service';

// interfaces
import IHabit from '../../models/habit.entity';
import { IHabitAPISucessfullResponseWithData } from '../../models/IAPISucessResponse';

@Component({
  selector: 'app-diplay-current-habits-overview',
  standalone: true,
  imports: [
    ModalForAddingHabitComponent,
    TodaysOverviewOfHabitsComponent
  ],
  templateUrl: './diplay-current-habits-overview.component.html',
  styleUrl: './diplay-current-habits-overview.component.css'
})
export class DiplayCurrentHabitsOverviewComponent {
  private habitServices: HabitService = inject(HabitService);

  isModalOpen: boolean = false;

  habitsData: IHabit[] = [];
  dispalyHabits: IHabit[] = [];

  constructor() {
    this.getData();
  }

  private getData() {
    const getAllHabitsAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit[]>> = this.habitServices.getAllHabits();

    getAllHabitsAPIResponse$.subscribe({
      next: (res) => {
        this.habitsData = res.data;
        this.dispalyHabits = this.habitsData;
      },
      error: (err) => {}
    });
  }

  modalOpenOrClose(status: boolean = false, newHabit: IHabit | null = null) {
    this.isModalOpen = status;

    if(newHabit) { // only add new habit after new habited is added
      // this.habitsData.push(newHabit);
      this.habitsData = [...this.habitsData, newHabit];
      this.dispalyHabits = this.habitsData;
    }
  }

  markedHabitAsCompleted(updatedHabit: IHabit) {
    console.log(updatedHabit, 'sdfs');
    
    this.habitsData = this.habitsData.map((habit) => {
      if(habit._id === updatedHabit._id) return updatedHabit;
      else return habit;
    });

    this.dispalyHabits = this.habitsData;
  }
}
