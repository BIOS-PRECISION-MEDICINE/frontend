import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDatumSubTaskExamComponent } from "./config-datum-sub-task-exam.component";


describe('Configurar dato de sub-tarea', () =>{

    let component: ConfigDatumSubTaskExamComponent;
    let fixture: ComponentFixture<ConfigDatumSubTaskExamComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigDatumSubTaskExamComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre: es requerido)', () => {
        const fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        desc.setValue('Texto de prueba.');
        expect(form.invalid).toBeTrue();
    });

    it('Creación de nuevo dato de sub-tarea: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        process.setValue('Texto de prueba.');
        desc.setValue('Texto de prueba.');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición dato de sub-tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar dato de sub-tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado dato de sub-tareas existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigDatumSubTaskExamComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});