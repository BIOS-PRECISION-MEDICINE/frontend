import { Injectable } from '@angular/core';

// Services.
import { UsuarioService } from './usuario.service';
import { MenuPipelineService } from './menu-pipeline.service';
import { MenuAdminPipelineService } from './menu-admin-pipeline.service';
import { MenuConfigService } from './menu-config.service';
import { MenuPruebasService } from './menu-pruebas.service';

// Models and Constants.
import { Menu } from '../models/menu.model';
import { SubMenu } from '../models/subMenu.model';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: Array<Menu> = [];
  constructor(private _usuarioService: UsuarioService,
    private _menuPipeline: MenuPipelineService,
    private _menuAdminPipeline: MenuAdminPipelineService,
    private _menuConfig: MenuConfigService,
    private _menuPruebas: MenuPruebasService){
      
  }

  

  loadMenu() {
    this.menu= [
      {
        titulo: 'Inicio',
        icono: 'fa-solid fa-house',
        //subMenu: [],
        path:"/dashboard"
      },
    ];

    // Se agregan los menu por cada proyecto(Core).

    this.createMenu(this.menu, this._menuPipeline.createMenuPipeline());
    this.createMenu(this.menu, this._menuAdminPipeline.createMenuAdminPipeline());
    this.createMenu(this.menu, this._menuConfig.createMenuConfig());
    // this.createMenu(menu, this._menuPruebas.createMenuPruebas());

    //this.validatePermissionMenu(menu);
    console.log("menu "+JSON.stringify(this.menu))

  }

  // Permite crear el menú final de las distintas apps.
  createMenu(menu: Array<Menu>, menuApp: Array<Menu>){
    menu.push.apply(menu,menuApp);
  }

  // //Permite validar por ruta si cuenta con los permisos definidos.
  // validatePermissionMenu(menu: Array<Menu>){

  //   this.menu = [];
  //    menu.filter(m =>{
  //     m.subMenu.forEach(sm =>{
  //       if (!this._usuarioService.checkPermission(sm.permiso!)){
  //         m.subMenu = m.subMenu.filter(x => x.permiso != sm.permiso);
  //         return;
  //       }
  //     })

  //     // Se valida si el menú tiene por lo menos un subMenu.
  //     if(m.subMenu.length >= 0){
  //       this.menu.push(m);
  //     }
  //   });
  // }

}
