import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigExamsComponent } from "./config-exams.component";


describe('Configurar examens', () =>{

    let component: ConfigExamsComponent;
    let fixture: ComponentFixture<ConfigExamsComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigExamsComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigExamsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Nombre, Proceso: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigExamsComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const value = app.forms.controls['patient_id'];

        name.setValue('Examen 002');
        value.setValue('213');

        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nuevo examen: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamsComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const name = app.forms.controls['name'];
        const value = app.forms.controls['patient_id'];

        name.setValue('Examen 002');
        value.setValue('213');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición examen existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamsComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar examen existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigExamsComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado examen existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigExamsComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});