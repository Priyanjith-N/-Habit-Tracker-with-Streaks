import { Component, inject } from '@angular/core';
import IHabit from '../../models/habit.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';
import { Observable } from 'rxjs';
import { IHabitAPISucessfullResponseWithData } from '../../models/IAPISucessResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent {
  private habitService: HabitService = inject(HabitService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private habitId: string | null;
  private habitData: IHabit | null = null;

  toggleChangeMonth: boolean = false;

  monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  currentMonth: Date;
  calendarDays: (number | null)[] = [];

  constructor() {
    this.habitId = this.activatedRoute.snapshot.paramMap.get("habitId");

    this.getData();

    this.currentMonth = new Date();
    this.generateCalendar(this.currentMonth)
  }

  toggleMonth() {
    this.toggleChangeMonth = !this.toggleChangeMonth;
  }

  getData() {
    if(!this.habitId) {
      this.router.navigate(["/"]);
      return;
    }
    
    const getHabitDataAPIResponse$: Observable<IHabitAPISucessfullResponseWithData<IHabit>> = this.habitService.getHabitData(this.habitId);
    
    getHabitDataAPIResponse$.subscribe({
      next: (res) => {
        this.habitData = res.data;
      },
      error: (err) => {
        this.router.navigate(["/"]);
      }
    });
  }

  dayIsCompleted(day: number): "not-completed" | "completed" | "day-not-meet" {
    if(!this.habitData) return "day-not-meet";
    
    const currentMonth = this.currentMonth.getMonth();

    const habitCreatedDate: Date = new Date(this.habitData.createdAt);

    if(habitCreatedDate.getMonth() === currentMonth && habitCreatedDate.getDate() > day) {
      return "day-not-meet";
    }
    
    for(const date of this.habitData.datesCompleted) {
      const completedDate = new Date(date);
      const completedDateMonth = completedDate.getMonth();
      const completedDateDay = completedDate.getDate();

      if(completedDateMonth === currentMonth && completedDateDay === day) return "completed";
    }

    const currentDate = new Date();

    if(currentDate.getMonth() === currentMonth && currentDate.getDate() < day) {
      return "day-not-meet";
    }

    return "not-completed";
  }

  isCurrentDay(day: number) {
    const currentMonth = this.currentMonth.getMonth();

    const todayDate: Date = new Date();

    if(currentMonth === todayDate.getMonth() && todayDate.getDate() === day) return true;

    return false;
  }

  generateCalendar(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay(); // Day of the week (0 - Sunday, 6 - Saturday)
    const totalDays = endOfMonth.getDate(); // Total days in the month

    const calendarDays = [];

    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      calendarDays.push(day);
    }

    this.calendarDays = calendarDays;
  }
}
