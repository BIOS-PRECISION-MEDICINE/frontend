import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoUsuarioComponent } from './historico-usuario.component';

describe('HistoricoUsuarioComponent', () => {
  let component: HistoricoUsuarioComponent;
  let fixture: ComponentFixture<HistoricoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
