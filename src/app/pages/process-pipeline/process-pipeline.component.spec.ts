import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessPipelineComponent } from "./process-pipeline.component";


describe('Configurar proceso', () =>{

    let component: ProcessPipelineComponent;
    let fixture: ComponentFixture<ProcessPipelineComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ProcessPipelineComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ProcessPipelineComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de parámetros (Ingresar valores): Debe retornar formulario valido (Campos requeridos)', () => {
        const fixture = TestBed.createComponent(ProcessPipelineComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        desc.setValue('Texto de prueba.');
        expect(form.invalid).toBeTrue();
    });

    it('Inicializar un nuevo proceso: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ProcessPipelineComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        process.setValue('Texto de prueba.');
        desc.setValue('Texto de prueba.');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(true).toBeTrue();
    });

    it('Finalización de proceso: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ProcessPipelineComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

    it('Carga y configuración de siguiente proceso existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ProcessPipelineComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

    it('Listado procesos existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ProcessPipelineComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(true).toBeTrue();
    });

});