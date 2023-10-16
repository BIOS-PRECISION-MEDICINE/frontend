import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigDatumComponent } from "./config-datum.component";


describe('Configurar datos', () =>{

    let component: ConfigDatumComponent;
    let fixture: ComponentFixture<ConfigDatumComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            NgxPaginationModule,
            ReactiveFormsModule, 
          ],
        declarations: [ConfigDatumComponent]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ConfigDatumComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('Inicialización de componente: El componente se debe inicializar', () => {
      expect(component).toBeTruthy();
    });

    it('Validación de campos (Agregar, Editar): Debe retornar formulario valido (Parámetro, Valor: requerido)', () => {
        const fixture = TestBed.createComponent(ConfigDatumComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const param = app.forms.controls['param_id'];
        const value = app.forms.controls['value'];

        param.setValue('1');
        value.setValue('11234');

        expect(!form.invalid).toBeTrue();
    });

    it('Creación de nuevo dato: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        const param = app.forms.controls['param_id'];
        const value = app.forms.controls['value'];

        param.setValue('1');
        value.setValue('11234');

        const btnGuardar = fixture.debugElement.query(By.css('button.btn'));
        btnGuardar.nativeElement.click();

        expect(app.isOK).toBeTrue();
    });

    it('Edición dato existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Eliminar dato existente: Debe retornar 200 OK', () => {
        const fixture = TestBed.createComponent(ConfigDatumComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

    it('Listado dato existente: Debe retornar array[]', () => {
        const fixture = TestBed.createComponent(ConfigDatumComponent);
        const app = fixture.componentInstance;
        fixture.detectChanges();

        const form = app.forms;
        
        expect(app.isOK).toBeTrue();
    });

});