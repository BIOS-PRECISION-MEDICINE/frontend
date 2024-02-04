import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';

import { RolesService } from 'src/app/services/roles-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario_local.model';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-usuarios',
  templateUrl: './config-usuarios.component.html',
  styleUrls: []
})
export class ConfigUsuariosComponent {
  public id_user:string= '-1';
  public name_user:string= '';
  public forms!: FormGroup;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstUsers: any = [];
  public lstRoles: any = [];

  constructor(private fb: FormBuilder, private _users_service: UsuarioService, private _roles_service: RolesService, private _alert: AlertPersonalService) {
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get nick_nameNoValido() {
    return this.forms.get('nick_name')?.invalid && this.forms.get('nick_name')?.touched;
  }

  get emailNoValido() {
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: [{ value: null, disabled: true }, Validators.required],
      nick_name: [{ value: null, disabled: true }, Validators.required],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      rol_id: ['', [Validators.required]]
    });
    this.forms.patchValue({ rol_id: '-1' });
  }

  ngOnInit(): void {
    this.changePageTable(1);    
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._users_service.getListingUsers(page).subscribe(resp => {
      this.lstUsers = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      this.getAllRoles();
      $('.preloader').hide();
    });
  }

  modalUserEdit(id_user: string): void {
    this.getUserById(id_user);
    $('#UserEdit').modal({ backdrop: 'static', keyboard: false });
  }

  modalUserConfirmation(id_user:string): void {
    this._users_service.getUserById(id_user).subscribe(resp => {
      let user_edit: any = resp;
      this.id_user=user_edit?.id;
      this.name_user= user_edit?.name; 
      // Se muestra modal.
      $('#UserDelete').modal({ backdrop: 'static', keyboard: false });
    });
  
  }

  modalClose(): void {
    this.id_user= '-1';
    this.forms.reset();
    $('#UserEdit').modal('hide');
  }

  editUser(): void {
    if (this.forms.controls['rol_id'].value === '-1') {
      this._alert.mostrarAlertTipoToast(ALERT_TYPE.WARNING, 'El campo rol de usuario es requerido.');
    }
    else{
      let user:Usuario= new Usuario();
      user.id=parseInt(this.id_user);
      user.role_id = this.forms.controls['rol_id'].value;
      user.name = this.forms.controls['name'].value;
      user.nick_name = this.forms.controls['nick_name'].value;
      user.email = this.forms.controls['email'].value;

      this._users_service.updateLocalUser(user).subscribe(resp => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Usuario actualizado exitosamente.'
          );
          this.changePageTable(1);
        } 
      });
      
    }
  }

  removeUser(id_user:string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el usuario con id N° ${id_user} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._users_service.deleteUserById(id_user).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Usuario eliminado exitosamente.'
            );
          } else {
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );
          }
        });
      }
      $('.preloader').hide();
    });
  }

  getAllRoles(): void {

    this._roles_service.getAllListingRoles().subscribe(resp => {
      this.lstRoles = resp.data;
      // Sets name of task for each task in list
      this.lstUsers.forEach((item: any) => {
        item.role_name = this.lstRoles.find((obj: any) => {
          return obj.id === item.role_id;
        }).name;
      });
    });
  }

  getUserById(id_user: string): void {

    this._users_service.getUserById(id_user).subscribe(resp => {
      let user_edit: any = resp;
      this.id_user=user_edit?.id;
      this.forms.setValue({
        name: user_edit?.name,
        nick_name: user_edit?.nick_name,
        email: user_edit?.email,
        rol_id: user_edit?.role_id
      });

    });
  }

}
