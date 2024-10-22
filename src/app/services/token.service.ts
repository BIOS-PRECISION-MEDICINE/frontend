import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import * as moment from 'moment';

// Services.
import { UsuarioService } from './usuario.service';
import { AuthOrigenService } from './auth-origen.service';

// Environment and constants.
import { environment } from '../../environments/environment';
import { SYSTEM } from '../constants/system.constants';

const URL_AUTH = environment.url_auth;
declare let google: any;
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  nuevoToken!: string;
  constructor(private http: HttpClient, private usuarioService: UsuarioService,
              private router: Router, private _origenService: AuthOrigenService) { }

  verificarTiempoDeVidaToken(token: string, system: string = ''): Promise<boolean> | boolean {

    if( !token ) {
      this.router.navigate(['/login']);
      return false;
    }
    let payload = JSON.parse(atob(token.split(".")[1]));
    let expirado: boolean = this.tokenExpirado(payload.exp);
    /* Si el token ya esta expirado se retorna false para que el usuario no pueda seguir utilizando la pagina
      y se retorna al usuario a login para que este obligado a iniciar sesión y generar un nuevo token
     */
    if (expirado) {
      this.router.navigate(['/login']);// se envia al login token expirado
      return false;
    }
    return this.verificaRenuevaToken(payload.exp, system);
  }

  // Permite verificar y renovar el token de acuerdo al sistema(Origen|Billetera)
  verificaRenuevaToken(fechaExp: number, system: string = ''): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      // Para convertir milesimas a segundos.
      let tokenExp: Date = new Date(fechaExp * 1000);
      let ahora: Date = new Date();
      // Se utiliza la libreria Moment que permite y facilita hacer comparaciones y validaciones entre fechas
      // Entre multiples funcionalidades que tiene Document: https://momentjs.com/docs/#/displaying/difference/
      let dToken = moment(tokenExp);
      let dAhora = moment(ahora);
      let DiferenciaMinutos: number = dToken.diff(dAhora, 'minutes');

      // Sumar 1 hora mas a la fecha actual : Tiemmpo de gracia que se le da al sistema para renovar el token
      // Ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000);
      /*** SE VALIDA SI FALTA  5  MINUTOS O MENOS PARA VENCER EL TOKEN****/
      if (DiferenciaMinutos > 5) {
        resolve(true);
      } else {
        // El token le falta menos de 5 minutos o menos para vencerse, se debe renovar.
        // Se valida el sistema para el cual se necesita el token.
        if(system === SYSTEM.HOME){
          this._origenService.authOrigen().subscribe(()=>{
            resolve(true);
          }, () => {
            // Se envia al login token expirado o  no  es valido.
            this.router.navigate(['/login']);
            reject(false);
          });

        }else{

          this.renovarToken();
        }
      }
      resolve(true);
    });
  }

  // Método que valida si el token aun esta vigente o a expirado.
  tokenExpirado(fechaExp: number): boolean {
    // Convertir segundos a milesimas.
    let ahora: number = new Date().getTime() / 1000;

    if (ahora > fechaExp) {
      return true
    } else {
      return false;
    }
  }

  renovarToken() {
    sessionStorage.clear();
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
    window.onload = () => {
      google.accounts.id.disableAutoSelect();
    };
  }

}
