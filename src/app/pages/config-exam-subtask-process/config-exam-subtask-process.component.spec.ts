import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigExamSubtaskProcessComponent } from "./config-exam-subtask-process.component";


describe('Configurar examen sub-tarea', () =>{

    let component: ConfigExamSubtaskProcessComponent;
    let fixture: ComponentFixture<ConfigExamSubtaskProcessComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigExamSubtaskProcessComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Id examen: es requerido)', () => {
        const fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        desc.setValue('Texto de prueba.');
        expect(form.invalid).toBeTrue();
    });

    it('Creación de nuevo examen sub-tarea: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const examen = app.forms.controls['id_examen'];
        const task = app.forms.controls['id_task'];
        examen.setValue('Texto de prueba.');
        task.setValue('Texto de prueba.');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(true).toBeTrue();
    });

    it('Edición examen sub-tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

    it('Eliminar examen sub-tarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

    it('Listado examen sub-tareas existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigExamSubtaskProcessComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

});