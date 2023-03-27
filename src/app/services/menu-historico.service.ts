import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuHistoricoService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuHistorico(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Histórico',
        icono: 'fa fa-history',
        subMenu: [
          new SubMenu(
            'Usuario', 'historico-usuario', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Pruebas', 'historico-pruebas' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          )
        ]
      }
    ];

    return menu;
  }
}
