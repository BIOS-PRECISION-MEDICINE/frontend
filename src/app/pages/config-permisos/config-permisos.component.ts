import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { PermissionsService } from 'src/app/services/permissions-service';

declare var $: any;

@Component({
  selector: 'app-config-permisos',
  templateUrl: './config-permisos.component.html',
  styleUrls: []
})
export class ConfigPermisosComponent {

  public lstPermissions: any = [];

  constructor(private fb: FormBuilder,private _permission_service: PermissionsService, private _alert: AlertPersonalService) {

  }

  ngOnInit(): void {
    this._permission_service.getListingPermissions().subscribe(resp => {
      this.lstPermissions = resp.data;
      })
  }

  modalPermissionInsert(): void {
    // Se muestra modal.
    $('#PermissionNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalPermissionConfirmation(): void {
    // Se muestra modal.
    $('#PermissionDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newPermission(): void{

  }

  editPermission(): void{

  }

  removePermission(): void{

  }

}
