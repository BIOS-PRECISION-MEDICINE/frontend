import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { SubMenu } from '../models/subMenu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuIgvService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuIgv(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Integrative Genomics Viewer (IGV)',
        icono: 'fa fa-history',
        subMenu: [
          new SubMenu(
            'Default', 'igv', ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Alignments', 'igv' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Interactions', 'igv' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'Segmented', 'igv' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
          new SubMenu(
            'VCF variants', 'igv' , ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN
          ),
        ]
      }
    ];

    return menu;
  }
}
