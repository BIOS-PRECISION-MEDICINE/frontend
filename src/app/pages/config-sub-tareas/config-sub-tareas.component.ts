import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { SubTarea } from 'src/app/models/subtarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { TasksService } from 'src/app/services/tasks.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-sub-tareas',
  templateUrl: './config-sub-tareas.component.html',
  styleUrls: ['./config-sub-tareas.component.css'],
})
export class ConfigSubTareasComponent {
  public isOK: boolean = false;
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public subTarea!: SubTarea;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstSubTasks: any = [];
  public lstTasks: any = [];

  constructor(
    private fb: FormBuilder,
    private _subtasks_service: SubTasksService,
    private _task_service: TasksService,
    private _alert: AlertPersonalService
  ) {
    this.subTarea = new SubTarea();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get taskNoValido() {
    return this.forms.get('task_id')?.invalid && this.forms.get('task_id')?.touched;
  }

  get orderNoValido() {
    return this.forms.get('order')?.invalid && this.forms.get('order')?.touched;
  }

  get commandNoValido() {
    return this.forms.get('command')?.invalid && this.forms.get('command')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      task_id: ['', Validators.required],
      command: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
    this._task_service.getAllListingTasks().subscribe((resp) => {
      this.lstTasks = resp.data;
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._subtasks_service.getListingSubTasks(page).subscribe((resp) => {
      this.lstSubTasks = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#SubTasksNew').modal('hide');
  }

  modalAddSubTask(): void {
    this.edit_state = false;
    this._task_service.getAllListingTasks().subscribe((resp) => {
      this.lstTasks = resp.data;
      this.forms.reset();
      $('#SubTasksNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalEditSubTask(id_subtarea: string): void {
    this.edit_state = true;
    this._subtasks_service.getSubtaskById(id_subtarea).subscribe((resp) => {
      this.subTarea = resp;
      $('#SubTasksNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsSubTask(id_subtarea: string): void {
    this._subtasks_service.getSubtaskById(id_subtarea).subscribe((resp) => {
      this.subTarea = resp;
      $('#subTaskDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newSubTask(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      this._subtasks_service
        .createNewSubTask(this.subTarea)
        .subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.modalClose();
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'SubTarea creado exitosamente.'
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

  editSubTask(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      this._subtasks_service.updateSubTask(this.subTarea).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'SubTarea actualizada exitosamente.'
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

  removeSubTask(id_subtarea: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar la sub-tarea con id N° ${id_subtarea} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._subtasks_service.deleteSubTask(id_subtarea).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'SubTarea eliminado exitosamente.'
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
