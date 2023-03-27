import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPipelineComponent } from './process-pipeline.component';

describe('ProcessPipelineComponent', () => {
  let component: ProcessPipelineComponent;
  let fixture: ComponentFixture<ProcessPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
