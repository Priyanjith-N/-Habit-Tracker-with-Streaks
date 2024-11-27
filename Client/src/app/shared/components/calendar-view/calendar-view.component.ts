import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css'
})
export class CalendarViewComponent {
  currentMonth: Date;
  calendarDays: (number | null)[] = [];

  constructor() {
    this.currentMonth = new Date();
    this.generateCalendar(this.currentMonth)
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
