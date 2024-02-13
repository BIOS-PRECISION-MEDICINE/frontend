import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoUsuarioPruebasComponent } from './historico-usuario-pruebas.component';

describe('HistoricoUsuarioPruebasComponent', () => {
  let component: HistoricoUsuarioPruebasComponent;
  let fixture: ComponentFixture<HistoricoUsuarioPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoUsuarioPruebasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoUsuarioPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
