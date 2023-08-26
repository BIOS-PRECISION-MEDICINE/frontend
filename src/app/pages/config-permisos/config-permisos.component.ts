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
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstPermissions: any = [];

  constructor(private fb: FormBuilder,private _permission_service: PermissionsService, private _alert: AlertPersonalService) {

  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._permission_service.getListingPermissions(page).subscribe(resp => {
      this.lstPermissions = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
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
