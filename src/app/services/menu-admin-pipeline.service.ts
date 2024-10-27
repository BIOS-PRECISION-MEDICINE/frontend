import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuAdminPipelineService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuAdminPipeline(): Array<Menu> {
    let menu: Array<Menu> = [
      {
        titulo: 'Pipeline',
        icono: 'fa-solid fa-sitemap',
        subMenu: [
          new SubMenu(
            'Procesos', 'config-procesos', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Tareas', 'config-tareas', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Sub-tareas', 'config-sub-tareas', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Parámetros', 'config-parametros', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          )
        ]
      }
    ];

    return menu;
  }
}
