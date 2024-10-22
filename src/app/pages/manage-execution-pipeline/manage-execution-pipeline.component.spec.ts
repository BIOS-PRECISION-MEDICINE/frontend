import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExecutionPipelineComponent } from './manage-execution-pipeline.component';

describe('ManageExecutionPipelineComponent', () => {
  let component: ManageExecutionPipelineComponent;
  let fixture: ComponentFixture<ManageExecutionPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExecutionPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExecutionPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
