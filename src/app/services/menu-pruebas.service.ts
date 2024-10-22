import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuPruebasService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes. */
  createMenuPruebas(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Pruebas',
        icono: 'fa fa-cogs',
        subMenu: [
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
          new SubMenu(
            'Pacientes', 'config-pacientes' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Data', 'config-datum' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Exámenes', 'config-exams' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Datos Subtareas examen', 'config-datum-sub-task-exam' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          )
        ]
      }
    ];

    return menu;
  }
}
