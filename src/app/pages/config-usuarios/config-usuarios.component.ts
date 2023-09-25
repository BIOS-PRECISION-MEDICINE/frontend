import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';

import { RolesService } from 'src/app/services/roles-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Usuario} from '../../models/usuario_local.model';

declare var $: any;

@Component({
  selector: 'app-config-usuarios',
  templateUrl: './config-usuarios.component.html',
  styleUrls: []
})
export class ConfigUsuariosComponent {
  edit_state:boolean = false;
  public forms!:FormGroup;
  public usuario_local!:Usuario;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstUsers: any = [];
  public lstRoles: any = [];

  constructor(private fb: FormBuilder,private _users_service: UsuarioService,private _roles_service: RolesService, private _alert: AlertPersonalService) {
    this.usuario_local = new Usuario();  
    this.crearFormulario(); 
  }

  get nameNoValido(){
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get nick_nameNoValido(){
    return this.forms.get('nick_name')?.invalid && this.forms.get('nick_name')?.touched;
  }

  get emailNoValido(){
    return this.forms.get('email')?.invalid && this.forms.get('email')?.touched;
  }

  crearFormulario(){
    this.forms=this.fb.group({
      name                         :['',Validators.required],
      nick_name             :['',Validators.required],
      email                 :['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      rol_id                :[]
    })
  }

  ngOnInit(): void {
    this.changePageTable(1);
    this.getAllRoles();    
  }

  changePageTable(page: number): void{
    $('.preloader').show();
    this._users_service.getListingUsers(page).subscribe(resp => {
      this.lstUsers = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
      });
  }

  modalUserAdd():void{
    this.edit_state = false;
    this.forms.reset();
    $('#UserEdit').modal({ backdrop: 'static', keyboard: false });
  }

  modalUserEdit(): void {
    this.edit_state = true;
    $('#UserEdit').modal({ backdrop: 'static', keyboard: false });
  }

  modalUserConfirmation(): void {
    // Se muestra modal.
    $('#UserDelete').modal({ backdrop: 'static', keyboard: false });
  }

  modalClose(): void{
    this.edit_state = false;
  }

  newUser(): void{
    if (!this.forms.valid){ 
      this.forms.markAllAsTouched();
      if(this.forms.controls['email'].errors && this.forms.controls['email'].errors['email']){
          this._alert.mostrarAlertTipoToast(ALERT_TYPE.WARNING,'El formato del email es incorrecto.');
      }
      else
      {
        this._alert.mostrarAlertTipoToast(ALERT_TYPE.WARNING,'Por favor llene los campos obligatorios.');
      }
    }
      else{
        this._users_service.createNewLocalUser(this.usuario_local).subscribe(resp => {
          alert("correct")
        });
        //this.limpiar();
      }
  }

  editUser(): void{

  }

  removeUser(): void{

  }

  getAllRoles():void{

    this._roles_service.getAllListingRoles().subscribe(resp => {
      this.lstRoles = resp.data;
      });
  }
}
