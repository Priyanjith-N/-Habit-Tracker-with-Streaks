import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysOverviewOfHabitsComponent } from './todays-overview-of-habits.component';

describe('TodaysOverviewOfHabitsComponent', () => {
  let component: TodaysOverviewOfHabitsComponent;
  let fixture: ComponentFixture<TodaysOverviewOfHabitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysOverviewOfHabitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysOverviewOfHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
