import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPipelineComponent } from './result-pipeline.component';

describe('ResultPipelineComponent', () => {
  let component: ResultPipelineComponent;
  let fixture: ComponentFixture<ResultPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
