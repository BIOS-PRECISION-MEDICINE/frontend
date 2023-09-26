import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Proceso } from 'src/app/models/process.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-procesos',
  templateUrl: './config-procesos.component.html',
  styleUrls: ['./config-procesos.component.css'],
})
export class ConfigProcesosComponent {
  public isOK: boolean= true;
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public process!: Proceso;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstProcesses: any = [];

  constructor(
    private fb: FormBuilder,
    private _process_service: ProcessesService,
    private _alert: AlertPersonalService
  ) {
    this.process = new Proceso();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      description: [],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._process_service.getListingProcesses(page).subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#ProcessNew').modal('hide');
  }

  modalAddProcess(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#ProcessNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalEditProcess(id_process: string): void {
    this.edit_state = true;
    this._process_service.getProcessById(id_process).subscribe((resp) => {
      this.process = resp;
      $('#ProcessNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsProcess(id_process: string): void {
    this._process_service.getProcessById(id_process).subscribe((resp) => {
      this.process = resp;
      $('#ProcessDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newProcess(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      this._process_service.createNewProcess(this.process).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Paciente creado exitosamente.'
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

  editProcess(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } 
    else {
      $('.preloader').show();
      this._process_service.updateProcess(this.process).subscribe((resp) => {
        if(resp.Meta.StatusCode == 200){
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Procesp actualizado exitosamente.'
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

  removeProcess(id_process: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el proceso con id N° ${(id_process)} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:  'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._process_service.deleteProcess(id_process).subscribe(resp =>{
          if(resp.Meta.StatusCode == 200){
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Proceso eliminado exitosamente.'
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
