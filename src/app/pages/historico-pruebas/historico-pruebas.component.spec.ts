import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPruebasComponent } from './historico-pruebas.component';

describe('HistoricoPruebasComponent', () => {
  let component: HistoricoPruebasComponent;
  let fixture: ComponentFixture<HistoricoPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPruebasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
