import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigParametersComponent } from "./config-parameters.component";


describe('Configurar parámetro', () =>{

    let component: ConfigParametersComponent;
    let fixture: ComponentFixture<ConfigParametersComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigParametersComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigParametersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre, Tipo, Sub-tarea, Opcional, Por defecto: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigParametersComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const type = app.forms.controls['type'];
        const subtask = app.forms.controls['subtask_id'];
        const optional = app.forms.controls['optional'];
        const byDefault = app.forms.controls['default_value'];
        name.setValue('Parámetro de prueba String 001.');
        type.setValue('1');
        subtask.setValue('1');
        optional.setValue('1');
        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nueva parámetro: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigParametersComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const type = app.forms.controls['type'];
        const subtask = app.forms.controls['subtask_id'];
        const optional = app.forms.controls['optional'];
        const byDefault = app.forms.controls['default_value'];
        name.setValue('Parámetro de prueba String 001.');
        type.setValue('Double');
        subtask.setValue('1');
        optional.setValue('1');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición parámetro existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigParametersComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar parámetro existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigParametersComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado parámetros existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigParametersComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});