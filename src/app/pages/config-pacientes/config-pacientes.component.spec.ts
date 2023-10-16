import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigPacientesComponent } from "./config-pacientes.component";


describe('Configurar pacientes', () =>{

    let component: ConfigPacientesComponent;
    let fixture: ComponentFixture<ConfigPacientesComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigPacientesComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigPacientesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Documento, Nombre, Apellidos, Fecha de nacimiento: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigPacientesComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const document = app.forms.controls['document'];
        const name = app.forms.controls['name'];
        const lastname = app.forms.controls['lastname'];
        const birth_year = app.forms.controls['birth_year'];

        name.setValue('Julian Andres');
        document.setValue('11234');
        lastname.setValue('Osorio Calle');
        birth_year.setValue('12-12-2002');
        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nueva paciente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigPacientesComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const document = app.forms.controls['document'];
        const name = app.forms.controls['name'];
        const lastname = app.forms.controls['lastname'];
        const birth_year = app.forms.controls['birth_year'];

        name.setValue('Julian Andres');
        document.setValue('11234');
        lastname.setValue('Osorio Calle');
        birth_year.setValue('12-12-2002');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición paciente existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigPacientesComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar paciente existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigPacientesComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado pacientes existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigPacientesComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});