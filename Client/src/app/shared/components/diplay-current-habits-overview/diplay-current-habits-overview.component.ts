import { Component } from '@angular/core';
import { ModalForAddingHabitComponent } from '../modal-for-adding-habit/modal-for-adding-habit.component';
import IHabit from '../../models/habit.entity';

@Component({
  selector: 'app-diplay-current-habits-overview',
  standalone: true,
  imports: [
    ModalForAddingHabitComponent
  ],
  templateUrl: './diplay-current-habits-overview.component.html',
  styleUrl: './diplay-current-habits-overview.component.css'
})
export class DiplayCurrentHabitsOverviewComponent {
  isModalOpen: boolean = false;

  private habitsData: IHabit[] = [];
  dispalyHabits: IHabit[] = [];

  modalOpenOrClose(status: boolean = false, newHabit: IHabit | null = null) {
    this.isModalOpen = status;

    if(newHabit) { // only add new habit after new habited is added
      this.habitsData.push(newHabit);
      this.dispalyHabits = this.habitsData;
    }
  }
}
