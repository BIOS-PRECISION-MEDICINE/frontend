import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Services.
import { AlertPersonalService } from './alert-custome.service';

// Vars, models, environtments.
import { environment } from '../../environments/environment';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';

declare var $:any;

// Se definen las constantes para obtener el token de acceso a los servicios.
const URL_AUTH_ORIGEN = environment.url_auth;

@Injectable({
  providedIn: 'root'
})
export class AuthOrigenService {

  userVerify: boolean = false;

  constructor(private http: HttpClient, private _alerService: AlertPersonalService) { }

  /*
    Método que permite autenticar con los servicios de back-end para obtener el respectivo token de acceso.
    El token dura una hora.
  . */
  authOrigen(){
    // Definición de parámetros x-www-form-urlencoded.
    const body = new HttpParams()
    .set('url', URL_AUTH_ORIGEN);

    let headers = new HttpHeaders({
      'Content-type':'application/x-www-form-urlencoded'
    });

    let options = { headers: headers };

    return this.http.post(`${ environment.url_base}TokenOrigen`, body, options)
    .pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( error => {
        $('.preloader').hide();
        sessionStorage.removeItem('token-origen');
        this._alerService.mostrarAlertaSimplesPorTipo(ALERT_TYPE.ERROR, 'Ocurrió un error al obtener el token de acceso Origen', "Error inesperado");
        return of({});
      })
    );
  }


}
