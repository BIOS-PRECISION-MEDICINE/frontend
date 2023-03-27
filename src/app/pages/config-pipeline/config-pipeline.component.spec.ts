import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPipelineComponent } from './config-pipeline.component';

describe('ConfigPipelineComponent', () => {
  let component: ConfigPipelineComponent;
  let fixture: ComponentFixture<ConfigPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
