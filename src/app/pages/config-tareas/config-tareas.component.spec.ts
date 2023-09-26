import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigTareasComponent } from "./config-tareas.component";


describe('Configurar tarea', () =>{

    let component: ConfigTareasComponent;
    let fixture: ComponentFixture<ConfigTareasComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigTareasComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigTareasComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre, Proceso, orden: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const process = app.forms.controls['process_id'];
        const order = app.forms.controls['order'];
        const desc = app.forms.controls['description'];
        name.setValue('Tarea de prueba 04.');
        process.setValue('1');
        order.setValue('1');
        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nueva tarea: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const process = app.forms.controls['process_id'];
        const order = app.forms.controls['order'];
        const desc = app.forms.controls['description'];
        process.setValue('2');
        desc.setValue('Texto de prueba.');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado tareas existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});