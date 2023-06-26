import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { SubTasksService } from 'src/app/services/sub-tassk.service';


declare var $: any;

@Component({
  selector: 'app-config-sub-tareas',
  templateUrl: './config-sub-tareas.component.html',
  styleUrls: ['./config-sub-tareas.component.css']
})
export class ConfigSubTareasComponent {

  public lstSubTasks: any = [];

  constructor(private fb: FormBuilder,private _subtasks_service: SubTasksService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._subtasks_service.getListingSubTasks().subscribe(resp => {
      this.lstSubTasks = resp.data;
      })
  }

  modalSubTasksEdit(): void {
    // Se muestra modal.
    $('#SubTasksNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalSubTasksConfirmation(): void {
    // Se muestra modal.
    $('#SubTasksDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newSubTasks(): void{

  }

  editSubTasks(): void{

  }

  removeSubTasks(): void{

  }
}
