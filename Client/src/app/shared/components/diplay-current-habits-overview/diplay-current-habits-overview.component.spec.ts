import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayCurrentHabitsOverviewComponent } from './diplay-current-habits-overview.component';

describe('DiplayCurrentHabitsOverviewComponent', () => {
  let component: DiplayCurrentHabitsOverviewComponent;
  let fixture: ComponentFixture<DiplayCurrentHabitsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplayCurrentHabitsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplayCurrentHabitsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
