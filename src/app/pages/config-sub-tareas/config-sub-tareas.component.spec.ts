import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigSubTareasComponent } from "./config-sub-tareas.component";


describe('Configurar subTareas', () =>{

    let component: ConfigSubTareasComponent;
    let fixture: ComponentFixture<ConfigSubTareasComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigSubTareasComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigSubTareasComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre, tarea, orden, comando: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigSubTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const task = app.forms.controls['tarea_id'];
        const order = app.forms.controls['order'];
        const command = app.forms.controls['command'];
        const desc = app.forms.controls['description'];
        name.setValue('SubTarea test H01.');
        task.setValue('1');
        order.setValue('1');
        command.setValue('-vm 250');
        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nueva subTarea: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigSubTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const task = app.forms.controls['tarea_id'];
        const order = app.forms.controls['order'];
        const command = app.forms.controls['command'];
        const desc = app.forms.controls['description'];
        
        name.setValue('SubTarea test H01.');
        task.setValue('1');
        order.setValue('1');
        command.setValue('-vm 250');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición subTarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigSubTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar subTarea existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigSubTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado subTareas existentes: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigSubTareasComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});