import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUsuariosComponent } from './config-usuarios.component';

describe('ConfigUsuariosComponent', () => {
  let component: ConfigUsuariosComponent;
  let fixture: ComponentFixture<ConfigUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
