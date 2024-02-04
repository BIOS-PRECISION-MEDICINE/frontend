import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Datum } from 'src/app/models/datum.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { DatumService } from 'src/app/services/datum.service';
import { ParametersService } from 'src/app/services/parameters.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-datum',
  templateUrl: './config-datum.component.html',
})
export class ConfigDatumComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public datum!: Datum;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstDatum: any = [];
  public lstParams: any = [];

  constructor(private fb: FormBuilder,private _datum_service: DatumService, private _parameters_service: ParametersService, private _alert: AlertPersonalService) {
    this.datum = new Datum();
    this.crearFormulario();
  }

  get paramidNoValido() {
    return this.forms.get('param_id')?.invalid && this.forms.get('param_id')?.touched;
  }

  get valueNoValido() {
    return this.forms.get('value')?.invalid && this.forms.get('value')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      value: ['', Validators.required],
      param_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    $('.preloader').show();
    
    this._parameters_service.getAllListingParameters().subscribe((resp) => {
      this.lstParams = resp.data;
      this.changePageTable(1);
    });
  }

  changePageTable(page: number): void{
    $('.preloader').show();
    this._datum_service.getListingDatum(page).subscribe(resp => {
      this.lstDatum = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      // Sets name of patient for each exam in list
      this.lstDatum.forEach((item: any) => {
        item.param_name= this.lstParams.find((obj: any) => {
          return obj.id === item.param_id;
        }).name;
        
      });
      $('.preloader').hide();
      });
  }

  modalClose(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#DatumNew').modal('hide');
  }

  modalAddDatum(): void {
    this.edit_state = false;
    this._datum_service.getAllListingDatums().subscribe((resp) => {
      this.lstDatum = resp.data;
      this.forms.reset();
      this.forms.get('param_id')?.setValue('', {
        onlySelf: true,
      });
      $('#DatumNew').modal({ backdrop: 'static', keyboard: false });
    });    
  }

  modalEditDatum(id_dato: string): void {
    this.edit_state = true;
    this._datum_service.getDatumById(id_dato).subscribe((resp) => {
      
      this.forms.setValue({
        id: resp.id,
        param_id: resp.param_id,
        value: resp.value
      });
      $('#DatumNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsDatum(id_datum: string): void {
    this._datum_service.getDatumById(id_datum).subscribe((resp) => {
      this.datum = resp;
      this.datum.param_name= this.lstParams.find((obj: any) => {
        return obj.id === resp.param_id;
      }).name;
      $('#DatumDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newDatum(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let datum: Datum = this.forms.value;
      this._datum_service.createNewDatum(datum).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Dato creada exitosamente.'
          );
          this.changePageTable(1);
        } else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  editDatum(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } 
    else {
      $('.preloader').show();
      let datum: Datum = this.forms.value;
      this._datum_service.updateDatum(datum).subscribe((resp) => {
        if(resp.Meta.StatusCode == 200){
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Dato actualizado exitosamente.'
          );
          this.changePageTable(1);
        }
        else{
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  removeDatum(id_datum: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el dato con id N° ${(id_datum)} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:  'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._datum_service.deleteDatum(id_datum).subscribe(resp =>{
          if(resp.Meta.StatusCode == 200){
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Dato eliminado exitosamente.'
            );   
          }
          else{
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );   
          }
        });
      }
      $('.preloader').hide();
    })
  }

}
