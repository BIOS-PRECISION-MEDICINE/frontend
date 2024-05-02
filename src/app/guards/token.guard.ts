import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Services.
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private _tokenService: TokenService) {}

  canActivate(): Promise<boolean> | boolean {
    let token: string = sessionStorage.getItem('token') || '';
    return this._tokenService.verificarTiempoDeVidaToken(token);
  }
}
