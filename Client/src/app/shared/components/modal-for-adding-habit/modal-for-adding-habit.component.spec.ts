import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForAddingHabitComponent } from './modal-for-adding-habit.component';

describe('ModalForAddingHabitComponent', () => {
  let component: ModalForAddingHabitComponent;
  let fixture: ComponentFixture<ModalForAddingHabitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalForAddingHabitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalForAddingHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
