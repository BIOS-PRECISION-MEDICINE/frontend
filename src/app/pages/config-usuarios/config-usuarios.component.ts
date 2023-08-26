import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var $: any;

@Component({
  selector: 'app-config-usuarios',
  templateUrl: './config-usuarios.component.html',
  styleUrls: []
})
export class ConfigUsuariosComponent {
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstUsers: any = [];

  constructor(private fb: FormBuilder,private _users_service: UsuarioService, private _alert: AlertPersonalService) {
    
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }


  changePageTable(page: number): void{
    this._users_service.getListingUsers(page).subscribe(resp => {
      this.lstUsers = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
  }

  modalUserEdit(): void {
    // Se muestra modal.
    $('#UserEdit').modal({ backdrop: 'static', keyboard: false });
  }

  modalUserConfirmation(): void {
    // Se muestra modal.
    $('#UserDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newUser(): void{

  }

  editUser(): void{

  }

  removeUser(): void{

  }
}
