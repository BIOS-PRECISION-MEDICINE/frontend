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
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstProcesses: any = [];

  constructor(private fb: FormBuilder,private _process_service: ProcessesService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._process_service.getListingProcesses(page).subscribe(resp => {
      this.lstProcesses = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
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
