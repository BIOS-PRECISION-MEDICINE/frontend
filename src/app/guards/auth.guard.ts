import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService,
  private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.usuarioService.verificarSesion()) {
    //   this.router.navigate(['/login']);
    // }
    // return this.usuarioService.verificarSesion();
    return true;
  }
  
}
