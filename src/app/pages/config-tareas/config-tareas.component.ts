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
  styleUrls: ['./config-tareas.component.css'],
})
export class ConfigTareasComponent {
  public isOK: boolean = true;
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
      name: ['', Validators.required],
      process_id: ['', Validators.required],
      order: ['', Validators.required],
      description: [],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._tasks_service.getListingTasks(page).subscribe((resp) => {
      this.lstTasks = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
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
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.forms.reset();
      $('#TaskNew').modal({ backdrop: 'static', keyboard: false });
    });    
  }

  modalEditTask(id_tarea: string): void {
    this.edit_state = true;
    this._tasks_service.getTaskById(id_tarea).subscribe((resp) => {
      this.task = resp;
      $('#TaskNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsTask(id_task: string): void {
    this._tasks_service.getTaskById(id_task).subscribe((resp) => {
      this.task = resp;
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

      this._tasks_service.createNewTask(this.task).subscribe((resp) => {
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
      this._tasks_service.updateTask(this.task).subscribe((resp) => {
        if(resp.Meta.StatusCode == 200){
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Tarea actualizado exitosamente.'
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

  removeTask(id_task: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar la tarea con id N° ${(id_task)} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:  'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._tasks_service.deleteTask(id_task).subscribe(resp =>{
          if(resp.Meta.StatusCode == 200){
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Tarea eliminado exitosamente.'
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
