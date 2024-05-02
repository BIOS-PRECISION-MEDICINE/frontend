import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services.
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private router: Router, private _userService: UsuarioService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // La propiedad data.permiso viene desde la ruta y no todas la deben tener.
    const permiso: number = next.data['permiso'] || 0;

    if(!this._userService.checkPermission(permiso)) { this.router.navigate(['/login']); }

    return this._userService.checkPermission(permiso);
  }

}
