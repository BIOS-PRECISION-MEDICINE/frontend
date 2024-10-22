import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) {
    this.usuario={
      email:"",
      nombre:"",

    }
    if(localStorage.getItem('variablesDeUsuarioLogadoDTO') === null){
      this.router.navigate(["/login"])
    }else{
      let usuario: googleCredentials = JSON.parse(localStorage.getItem('variablesDeUsuarioLogadoDTO')!);
      console.log("Nuevo logueado "+JSON.stringify(usuario))
      this.usuario = new Usuario(usuario.name,usuario.email,'',usuario.picture);
    }
    
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
