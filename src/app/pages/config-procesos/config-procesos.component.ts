import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ProcessesService } from 'src/app/services/processes.service';

declare var $: any;

@Component({
  selector: 'app-config-procesos',
  templateUrl: './config-procesos.component.html',
  styleUrls: ['./config-procesos.component.css']
})
export class ConfigProcesosComponent {

  public lstProcesses: any = [];

  constructor(private fb: FormBuilder,private _process_service: ProcessesService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._process_service.getListingProcesses().subscribe(resp => {
      this.lstProcesses = resp.data;
      })
  }

  modalProcessesEdit(): void {
    // Se muestra modal.
    $('#ProcessNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalProcessesConfirmation(): void {
    // Se muestra modal.
    $('#ProcessesDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newProcesses(): void{

  }

  editProcesses(): void{

  }

  removeProcesses(): void{

  }
}
