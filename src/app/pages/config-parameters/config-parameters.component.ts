import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ParametersService } from 'src/app/services/parameters.service';

declare var $: any;

@Component({
  selector: 'app-config-parameters',
  templateUrl: './config-parameters.component.html',
  styleUrls: ['./config-parameters.component.css']
})
export class ConfigParametersComponent {
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstParameters: any = [];

  constructor(private fb: FormBuilder,private _parameters_service: ParametersService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._parameters_service.getListingParameters(page).subscribe(resp => {
      this.lstParameters = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
  }

  modalParametersEdit(): void {
    // Se muestra modal.
    $('#ParametersNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalParametersConfirmation(): void {
    // Se muestra modal.
    $('#ParametersDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newParameters(): void{

  }

  editParameters(): void{

  }

  removeParameters(): void{

  }
}
