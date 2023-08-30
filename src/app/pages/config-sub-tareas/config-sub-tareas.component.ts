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
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstSubTasks: any = [];

  constructor(private fb: FormBuilder,private _subtasks_service: SubTasksService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._subtasks_service.getListingSubTasks(page).subscribe(resp => {
      this.lstSubTasks = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      });
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
