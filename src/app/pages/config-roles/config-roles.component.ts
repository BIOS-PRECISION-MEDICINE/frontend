import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { RolesService } from 'src/app/services/roles-service';

declare var $: any;

@Component({
  selector: 'app-config-roles',
  templateUrl: './config-roles.component.html',
  styleUrls: []
})
export class ConfigRolesComponent {
  public lstRoles: any = [];

  constructor(private fb: FormBuilder,private _roles_service: RolesService, private _alert: AlertPersonalService) {

  }

  ngOnInit(): void {
    this._roles_service.getListingRoles().subscribe(resp => {
      this.lstRoles = resp.data;
      })
  }

  modalRolesInsert(): void {
    // Se muestra modal.
    $('#RolNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalRolesConfirmation(): void {
    // Se muestra modal.
    $('#RolesDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newRoles(): void{

  }

  editRoles(): void{

  }

  removeRoles(): void{

  }
}
