import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Parametro } from 'src/app/models/parametro.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-parameters',
  templateUrl: './config-parameters.component.html',
})
export class ConfigParametersComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public param!: Parametro;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstSubTasks: any = [];
  public lstTypes: any = ['integer','time', 'string', 'file'];
  public lstParameters: any = [];

  constructor(
    private fb: FormBuilder,
    private _parameters_service: ParametersService,
    private _subtask_service: SubTasksService,
    private _alert: AlertPersonalService
  ) {
    this.param = new Parametro();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get typeNoValido() {
    return this.forms.get('type')?.invalid && this.forms.get('type')?.touched;
  }

  get subtaskNoValido() {
    return (
      this.forms.get('subtask_id')?.invalid &&
      this.forms.get('subtask_id')?.touched
    );
  }

  get optionalNoValido() {
    return (
      this.forms.get('optional')?.invalid && this.forms.get('optional')?.touched
    );
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      type: ['', Validators.required],
      optional: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    $('.preloader').show();
    this._subtask_service.getAllListingSubTasks().subscribe((resp) => {
      this.lstSubTasks = resp.data;
      this.changePageTable(1);
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._parameters_service.getListingParameters(page).subscribe((resp) => {
      this.lstParameters = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#NewParameter').modal('hide');
  }

  modalAddParameter(): void {
    this.forms.reset();
    this.edit_state = false;
    this.forms.get('type')?.setValue('', {
      onlySelf: true,
    });
    $('#NewParameter').modal({ backdrop: 'static', keyboard: false });
  }

  modalEditParameter(id_param: string): void {
    this.forms.reset();
    this.edit_state = true;
    this._parameters_service.getParameterById(id_param).subscribe((resp) => {
      this.forms.setValue({
        id: resp.id,
        name: resp.name,
        type: resp.type,
        optional: resp.optional,
      });
      $('#NewParameter').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsParameter(id_param: string): void {
    this._parameters_service.getParameterById(id_param).subscribe((resp) => {
      this.param = resp;
      $('#ParameterDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newParameter(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let param: Parametro = this.forms.value;
      this._parameters_service.createNewParameter(param).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Parámetro creado exitosamente.'
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

  editParameter(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let param: Parametro = this.forms.value;
      this._parameters_service.updateParameter(param).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Parámetro actualizado exitosamente.'
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

  removeParameter(id_param: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el parámetro con id N° ${id_param} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._parameters_service.deleteParameter(id_param).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Parámetro eliminado exitosamente.'
            );
          } else {
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );
          }
        });
      }
      $('.preloader').hide();
    });
  }
}
