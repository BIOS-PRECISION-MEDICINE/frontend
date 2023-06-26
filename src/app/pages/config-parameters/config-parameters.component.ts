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

  public lstParameters: any = [];

  constructor(private fb: FormBuilder,private _parameters_service: ParametersService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._parameters_service.getListingParameters().subscribe(resp => {
      this.lstParameters = resp.data;
      })
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
