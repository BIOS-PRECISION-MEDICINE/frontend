import { Menu } from './../../models/menu.model';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario.model';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  isActive:boolean;
  public usuario: Usuario;

  constructor(public sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    var usuario: googleCredentials = JSON.parse(localStorage.getItem('variablesDeUsuarioLogadoDTO')!);
    this.usuario = new Usuario(usuario.name, usuario.email);
    this.isActive=false;
  }

  ngOnInit(): void {
    const item = localStorage.getItem('token');
    if (item !== null) {
      this.isActive = true;
      console.log("Si existe")
    } else {
      this.isActive = false;
      console.log("NO existe")
    }
    this.sidebarService.loadMenu()
    this.sidebarService.menu;
  }

  logout() {
    this.usuarioService.logout();
  }

}
