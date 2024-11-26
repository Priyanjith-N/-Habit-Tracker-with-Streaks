import { Component } from '@angular/core';
import { ModalForAddingHabitComponent } from '../modal-for-adding-habit/modal-for-adding-habit.component';

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

  modalOpenOrClose(status: boolean = false) {
    this.isModalOpen = status;
  }
}
