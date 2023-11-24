import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigExamSubtaskProcessComponent } from './config-exam-subtask-process.component';

describe('ConfigExamSubtaskProcessComponent', () => {
  let component: ConfigExamSubtaskProcessComponent;
  let fixture: ComponentFixture<ConfigExamSubtaskProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigExamSubtaskProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
