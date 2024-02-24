import { Injectable } from '@angular/core';

// Services.
import { UsuarioService } from './usuario.service';
import { MenuPipelineService } from './menu-pipeline.service';
import { MenuConfigService } from './menu-config.service';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { SubMenu } from '../models/subMenu.model';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private _usuarioService: UsuarioService,
    private _menuPipeline: MenuPipelineService,
    private _menuConfig: MenuConfigService,
  ) {
  }

  public menu: Array<Menu> = [];

  loadMenu() {
    let menu: Array<Menu> = [
      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge--1',
        subMenu: []
      },
    ];

    // Se agregan los menu por cada proyecto(Core).

    this.createMenu(menu, this._menuPipeline.createMenuPipeline());
    this.createMenu(menu, this._menuConfig.createMenuConfig());

    this.validatePermissionMenu(menu);
  }

  // Permite crear el menú final de las distintas apps.
  createMenu(menu: Array<Menu>, menuApp: Array<Menu>) {
    menu.push.apply(menu, menuApp);
  }

  // Permite validar por ruta si cuenta con los permisos definidos.
  validatePermissionMenu(menu: Array<Menu>) {

    this.menu = [];
    menu.filter(m => {
      m.subMenu.forEach(sm => {
        if (!this._usuarioService.checkPermission(sm.permiso!)) {
          m.subMenu = m.subMenu.filter(x => x.permiso != sm.permiso);
          return;
        }
      })

      // Se valida si el menú tiene por lo menos un subMenu.
      if (m.subMenu.length >= 0) {
        this.menu.push(m);
      }
    });
  }

}
