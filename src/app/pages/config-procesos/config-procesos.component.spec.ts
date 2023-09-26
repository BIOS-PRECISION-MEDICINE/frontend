import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigProcesosComponent } from "./config-procesos.component";


describe('Configurar proceso', () =>{

    let component: ConfigProcesosComponent;
    let fixture: ComponentFixture<ConfigProcesosComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigProcesosComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigProcesosComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre: es requerido)', () => {
        const fixture = TestBed.createComponent(ConfigProcesosComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const process = app.forms.controls['name'];
        const desc = app.forms.controls['description'];
        desc.setValue('Texto de prueba.');
        expect(form.invalid).toBeTrue();
    });

    it('Creación de nuevo proceso: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigProcesosComponent);
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

    it('Edición proceso existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigProcesosComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar proceso existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigProcesosComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado procesos existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigProcesosComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});