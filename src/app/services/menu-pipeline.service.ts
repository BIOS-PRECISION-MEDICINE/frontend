import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuPipelineService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuPipeline(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Exámenes',
        icono: 'fa-solid fa-suitcase-medical',
        subMenu: [
          new SubMenu(
            'Pacientes', 'config-pacientes' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Resultados', 'result-pipeline' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          )
        ]
      }
    ];

    return menu;
  }
}
