import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { HabitService } from '../../../core/services/habit.service';

// interfaces
import IHabit, { IHabitWithCompletionStatus } from '../../models/habit.entity';
import { IHabitAPISucessfullResponseWithData } from '../../models/IAPISucessResponse';

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
  @Output() logAsCompletedHabit: EventEmitter<IHabit> = new EventEmitter();
  @ViewChild("searchBox") searchInputElement: ElementRef<HTMLInputElement> | undefined;

  private habitServices: HabitService = inject(HabitService);

  isFormSubmitedHabitId: string | null = null;

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
      
      const lastUpdated: Date | null = habit.lastUpdated ? new Date(habit.lastUpdated) : null;

      if(lastUpdated && lastUpdated.toISOString().split("T")[0] === today.toISOString().split("T")[0]) completedToday = true;

      return {...habit, completedToday};
    });

    this.setFilter();
  }

  filter: "all" | "completed" | "not-completed" = "all";

  setFilter(filter: "all" | "completed" | "not-completed" | null = null) {
    if(filter) {
      this.filter = filter;
    }
    
    if(this.searchInputElement) this.searchInputElement.nativeElement.value = "";

    this.displayHabitsData = this.habitsData.filter((habit) => {
      if(this.filter === "completed") return habit.completedToday;
      else if(this.filter === "not-completed") return !habit.completedToday;
      else return true; 
    });
  }

  search(event: Event) {
   const inputElement: HTMLInputElement = event.target as HTMLInputElement;
   const searchText: string = inputElement.value.toLowerCase();

   this.displayHabitsData = this.habitsData.filter((habit) => {
    const filter: boolean = (habit.habitName.toLowerCase().startsWith(searchText) || (habit.currentStreak === Number(searchText)) || (habit.highestStreak === Number(searchText)));

    if(!filter) return false;

    if(this.filter === "completed") return habit.completedToday;
    else if(this.filter === "not-completed") return !habit.completedToday;
    else return true; 
   });
  }

  markAsCompleted(habitId: string) {
    if(this.isFormSubmitedHabitId) return;

    this.isFormSubmitedHabitId = habitId;

    const logHabitAsCompletedAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit>> = this.habitServices.logHabitAsCompleted(habitId);

    logHabitAsCompletedAPIResponse$.subscribe({
      next: (res) => {
        this.isFormSubmitedHabitId = null;
        
        this.logAsCompletedHabit.emit(res.data);
       },
       error: (err) => {
         this.isFormSubmitedHabitId = null;
       }
    });
  }
}
