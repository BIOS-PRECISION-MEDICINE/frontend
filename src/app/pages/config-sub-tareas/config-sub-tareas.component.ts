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
})
export class ConfigSubTareasComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public subTask!: SubTarea;
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
    this.subTask = new SubTarea();
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
      id: [],
      name: ['', Validators.required],
      order: ['', Validators.required],
      task_id: ['', Validators.required],
      command: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    $('.preloader').show();
    this._task_service.getAllListingTasks().subscribe((resp) => {
      this.lstTasks = resp.data;
      this.changePageTable(1);
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._subtasks_service.getListingSubTasks(page).subscribe((resp) => {
      this.lstSubTasks = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;

      // Sets name of task for each task in list
      this.lstSubTasks.forEach((item: any) => {
        item.task_name = this.lstTasks.find((obj: any) => {
          return obj.id === item.task_id;
        }).name;
      });

      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#SubTasksNew').modal('hide');
  }

  modalAddSubTask(): void {
    this.forms.reset();
    this.edit_state = false;
    this._task_service.getAllListingTasks().subscribe((resp) => {
      this.lstTasks = resp.data;
      this.forms.reset();
      $('#SubTasksNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalEditSubTask(id_subtarea: string): void {
    this.forms.reset();
    this.edit_state = true;
    this._subtasks_service.getSubtaskById(id_subtarea).subscribe((resp) => {

      this.forms.setValue({
        id: resp.id,
        name: resp.name,
        order: resp.order,
        task_id: resp.task_id,
        command: resp.command,
        description: resp.description
      });

      $('#SubTasksNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsSubTask(id_subtarea: string): void {
    this.forms.reset();
    this._subtasks_service.getSubtaskById(id_subtarea).subscribe((resp) => {
      this.subTask = resp;
      this.subTask.task_name = this.lstTasks.find((obj: any) => {
        return obj.id === this.subTask.task_id;
      }).name
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
      let subTarea: SubTarea = this.forms.value;
      this._subtasks_service
        .createNewSubTask(subTarea)
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
      let subTarea: SubTarea = this.forms.value;
      this._subtasks_service.updateSubTask(subTarea).subscribe((resp) => {
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
