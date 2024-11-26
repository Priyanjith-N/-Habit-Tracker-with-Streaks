import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import IHabit, { IHabitWithCompletionStatus } from '../../models/habit.entity';

@Component({
  selector: 'app-todays-overview-of-habits',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './todays-overview-of-habits.component.html',
  styleUrl: './todays-overview-of-habits.component.css'
})
export class TodaysOverviewOfHabitsComponent implements OnChanges {
  @Input({ required: true }) data: IHabit[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.loadData();
    }
  }

  private habitsData: IHabitWithCompletionStatus[] = [];
  displayHabitsData: IHabitWithCompletionStatus[] = [];

  loadData() {
    this.habitsData = this.data.map((habit) => {
      let completedToday: boolean = false;

      const today = new Date();

      if(habit.lastUpdated && habit.lastUpdated.toISOString().split("T")[0] === today.toISOString().split("T")[0]) completedToday = true;

      return {...habit, completedToday};
    });

    this.displayHabitsData = this.habitsData;
  }

  filter: "all" | "completed" | "not-completed" = "all";

  setFilter(filter: "all" | "completed" | "not-completed") {
    this.filter = filter;

    this.displayHabitsData = this.habitsData.filter((habit) => {
      if(this.filter === "completed") return habit.completedToday;
      else if(this.filter === "not-completed") return !habit.completedToday;
      else return true; 
    });
  }
}
