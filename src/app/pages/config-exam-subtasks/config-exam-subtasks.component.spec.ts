import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigExamSubtasksComponent } from './config-exam-subtasks.component';

describe('ConfigExamSubtasksComponent', () => {
  let component: ConfigExamSubtasksComponent;
  let fixture: ComponentFixture<ConfigExamSubtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigExamSubtasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigExamSubtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
