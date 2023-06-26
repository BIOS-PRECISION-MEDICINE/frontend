import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { TasksService } from 'src/app/services/tasks.service';

declare var $: any;

@Component({
  selector: 'app-config-tareas',
  templateUrl: './config-tareas.component.html',
  styleUrls: ['./config-tareas.component.css']
})
export class ConfigTareasComponent {
  public lstTasks: any = [];

  constructor(private fb: FormBuilder,private _process_service: TasksService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._process_service.getListingTasks().subscribe(resp => {
      this.lstTasks = resp.data;
      })
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
