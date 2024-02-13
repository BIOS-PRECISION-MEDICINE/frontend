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
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstPermissions: any = [];

  constructor(private fb: FormBuilder,private _permission_service: PermissionsService, private _alert: AlertPersonalService) {

  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    $('.preloader').show();
    this._permission_service.getListingPermissions(page).subscribe(resp => {
      this.lstPermissions = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
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
