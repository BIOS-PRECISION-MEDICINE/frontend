import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuConfigService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuConfig(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Ajustes',
        icono: 'fa fa-cogs',
        subMenu: [
          new SubMenu(
            'Usuarios', 'config-usuarios', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Roles', 'config-roles' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Permisos', 'config-permisos' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Procesos', 'config-procesos', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Tareas', 'config-tareas' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Sub-tareas', 'config-sub-tareas' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Parámetros', 'config-parametros' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
        ]
      }
    ];

    return menu;
  }
}
