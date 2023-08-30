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
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstRoles: any = [];

  constructor(private fb: FormBuilder,private _roles_service: RolesService, private _alert: AlertPersonalService) {

  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._roles_service.getListingRoles(page).subscribe(resp => {
      this.lstRoles = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      });
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
