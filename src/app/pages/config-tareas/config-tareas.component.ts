import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { TasksService } from 'src/app/services/tasks.service';

import { Tarea } from 'src/app/models/tarea.model';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-config-tareas',
  templateUrl: './config-tareas.component.html',
})
export class ConfigTareasComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public task!: Tarea;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstTasks: any = [];
  public lstProcesses: any = [];

  constructor(
    private fb: FormBuilder,
    private _processes_service: ProcessesService,
    private _tasks_service: TasksService,
    private _alert: AlertPersonalService
  ) {
    this.task = new Tarea();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get processNoValido() {
    return (
      this.forms.get('process_id')?.invalid && this.forms.get('process_id')?.touched
    );
  }

  get orderNoValido() {
    return this.forms.get('order')?.invalid && this.forms.get('order')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      process_id: ['', Validators.required],
      order: ['', Validators.required],
      description: [],
    });
  }

  ngOnInit(): void {
    $('.preloader').show();
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.changePageTable(1);
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._tasks_service.getListingTasks(page).subscribe((resp) => {
      this.lstTasks = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;

      // Sets name of process for each task in list
      this.lstTasks.forEach((item: any) => {
        item.process_name = this.lstProcesses.find((obj: any) => {
          return obj.id === item.process_id;
        }).name
      });
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#TaskNew').modal('hide');
  }

  modalAddTask(): void {
    this.edit_state = false;
    this.forms.reset();
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      $('#TaskNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalEditTask(id_tarea: string): void {
    this.edit_state = true;
    this.forms.reset();
    this._tasks_service.getTaskById(id_tarea).subscribe((resp) => {

      this.forms.setValue({
        id: resp.id,
        name: resp.name,
        process_id: resp.process_id,
        order: resp.order,
        description: resp.description,
      });

      $('#TaskNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsTask(id_task: string): void {
    this._tasks_service.getTaskById(id_task).subscribe((resp) => {
      
      this.task = resp;
      this.task.process_name = this.lstProcesses.find((obj: any) => {
        return obj.id === this.task.process_id;
      }).name;

      $('#TaskDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newTask(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let task:Tarea = this.forms.value;
      this._tasks_service.createNewTask(task).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Tarea creada exitosamente.'
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

  editTask(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    }
    else {
      $('.preloader').show();
      let task: Tarea = this.forms.value;
      this._tasks_service.updateTask(task).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Tarea actualizado exitosamente.'
          );
          this.changePageTable(1);
        }
        else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  removeTask(id_task: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar la tarea con id N° ${(id_task)} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._tasks_service.deleteTask(id_task).subscribe(resp => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Tarea eliminado exitosamente.'
            );
          }
          else {
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
