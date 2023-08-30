import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { TasksService } from 'src/app/services/tasks.service';

import { Tarea } from 'src/app/models/tarea.model';
declare var $: any;

@Component({
  selector: 'app-config-tareas',
  templateUrl: './config-tareas.component.html',
  styleUrls: ['./config-tareas.component.css']
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

  constructor(private fb: FormBuilder,private _processes_service: ProcessesService,private _tasks_service: TasksService, private _alert: AlertPersonalService) {
    this.task = new Tarea();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get orderNoValido() {
    return this.forms.get('order')?.invalid && this.forms.get('order')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document: ['', Validators.required],
      birth_year: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
    this.lstProcesses=this._processes_service.getListingProcesses(1);
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
    });
  }

  changePageTable(page: number): void{
    this._tasks_service.getListingTasks(page).subscribe(resp => {
      this.lstTasks = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      });
  }

  modalClose(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#PatientNew').modal('hide');
  }

  modalAddTask(): void {
    this.edit_state = false;
    this._processes_service.getListingProcesses(1).subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
    });
    $('#TaskNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalTasksEdit(): void {
    // Se muestra modal.
    $('#ProcessNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalTasksConfirmation(): void {
    // Se muestra modal.
    $('#TasksDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newTasks(): void{

  }

  editTasks(): void{

  }

  removeTasks(): void{

  }
}
