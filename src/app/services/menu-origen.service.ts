import { Injectable } from '@angular/core';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { SubMenu } from '../models/subMenu.model';
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';

@Injectable({
  providedIn: 'root'
})
export class MenuOrigenService {

  constructor() { }

  /* Método que permite crear el menu con los permisos correspondientes para el core digital. */
  createMenuCoreDigital(): Array<Menu>{
    let menu: Array<Menu> = [
      {
        titulo: 'Core Digital',
        icono: 'fa fa-cogs',
        subMenu: [
          new SubMenu(
            'Autenticación', 'auth-origen', ORIGEN_PERMISSIONS.AUTH_ORIGEN
          ),
          new SubMenu(
            'Detalle del producto', 'product-details' , ORIGEN_PERMISSIONS.CONSULTA_ORIGEN
          )
        ]
      }
    ];

    return menu;
  }
}
