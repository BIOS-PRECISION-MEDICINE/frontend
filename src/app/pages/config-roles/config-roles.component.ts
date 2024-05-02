import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Role } from 'src/app/models/role.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { RolesService } from 'src/app/services/roles-service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-roles',
  templateUrl: './config-roles.component.html',
  styleUrls: []
})
export class ConfigRolesComponent {
  public forms!: FormGroup;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstRoles: any = [];

  constructor(private fb: FormBuilder, private _roles_service: RolesService, private _alert: AlertPersonalService) {
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      name: ['', Validators.required]
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._roles_service.getListingRoles(page).subscribe(resp => {
      this.lstRoles = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  modalRolesInsert(): void {
    this.forms.reset();
    $('#RolNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalClose(): void {
    this.forms.reset();
    $('#UserEdit').modal('hide');
  }

  createRole(): void {
    if (!this.forms.valid) {
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    }
    else{
      let role: Role = this.forms.value;
      $('.preloader').show();
      this._roles_service.createNewRole(role).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Role creado exitosamente.'
          );
          this.changePageTable(1);
        } else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
        $('.preloader').hide();
      });
    }
  }

  editRoles(): void {

  }

  removeRole(id_role:string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el role con id N° ${id_role} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._roles_service.deleteRoleById(id_role).subscribe((resp) => {
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
}
