import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { Usuario } from '../models/usuario.model';
import { Usuario as Ulocal } from '../models/usuario_local.model';
import { UserLogin } from 'src/app/models/userLogin.model';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { MESSAGES } from 'src/app/constants/messages.constants';
import { environment } from '../../environments/environment';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';
import { googleSignInResponse } from 'src/app/interfaces/googleSignInResponse';
import { ResponseApi } from '../interfaces/responseApi';

const CLIENT_ID = environment.client_id_google;
const URL_BASE = environment.url_base;
const URL_LOGIN = environment.url_login;
const URL_USERS = environment.url_api_users;
const URL_AUTH = environment.url_auth;
const per_page: number = environment.pagination_size;

declare var $: any;
declare let google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;

  public loginUsuario: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  saveSessionStorage(name: string, object: any) {
    sessionStorage.setItem(name, JSON.stringify(object));
  }

  logout() {
    sessionStorage.clear();
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
    window.onload = () => {
      google.accounts.id.disableAutoSelect();
    };
  }

  // Autenticación con servicio Google
  loginGoogle() {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        login_uri: URL_LOGIN,
        context: 'signin',
        allowed_parent_origin: URL_BASE,
        callback: (response: googleSignInResponse) => {
          this.handleCredentialResponse(response);
        },
      });

      google.accounts.id.renderButton(
        document.getElementById('google-sign-in'),
        { theme: 'outline', size: 'large' }
      );

      google.accounts.id.prompt();
    };
  }

  verificarSesion(): boolean {
    return !this.token ? false : true;
  }

  // Permite validar que el usuario tenga asociado un determinado permiso.
  checkPermission(permiso: number) {
    // Significa que la ruta no necesita permiso.
    /*if (permiso === 0 || permiso === undefined) {
      return true;
    }

    // Se define la lista de permisos.
    const permisos: number[] = JSON.parse(
      sessionStorage.getItem('variablesDeUsuarioLogadoDTO')!
    ).Permisos;

    // Se valida que el permiso este en el arreglo.
    if (permisos.indexOf(permiso) >= 0) {
      return true;
    }
    return false;*/
    return true;
  }

  public handleCredentialResponse(response: googleSignInResponse) {
    this.saveSessionStorage('token', response.credential);
    let VariablesDeUsuarioLogadoDTO: googleCredentials = this.decodeJwtResponse(
      response.credential
    );
    this.saveSessionStorage(
      'variablesDeUsuarioLogadoDTO',
      VariablesDeUsuarioLogadoDTO
    );
    this.router.navigate(['']);
  }

  public decodeJwtResponse(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload) as googleCredentials;
  }

  //Obtiene listado de usuarios activos en el sistema
  getListingUsers(current_page: number): Observable<ResponseApi> {

    let url = URL_USERS + '?page=' + current_page + '&per_page=' + per_page;

    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

  //Obtiene usuario por id activo en el sistema
  getUserById(id_user: string): Observable<ResponseApi> {

    let url = URL_USERS + '/' + id_user;

    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

  //Crea e inserta un nuevo usuario local en el sistema
  createNewLocalUser(usuario: Ulocal): Observable<any> {

    return this.http.post(URL_USERS + "/", { usuario })
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(error => {
          $('.preloader').hide();
          this._alerService.mostrarAlertaSimplesPorTipo(ALERT_TYPE.ERROR, 'Ocurrio un error al realizar la actualización', "Error inesperado");
          return of(
            {
              "Data": null,
              "Meta": {
                "StatusCode": 500,
                "ResultadoExitoso": false,
                "TipoRespuesta": "Error de base de datos"
              }
            }
          );
        })
      );

  }

  //edita un usuario local existente en el sistema
  updateLocalUser(usuario: Ulocal): Observable<any> {

    return this.http.put(URL_USERS + '/' + usuario.id, usuario, {})
      .pipe(
        map((resp: any) => {
          return {
            Data: resp,
            Meta: {
              StatusCode: 200,
              ResultadoExitoso: true,
              TipoRespuesta: '',
            },
          };
        }),
        catchError(error => {
          $('.preloader').hide();
          this._alerService.mostrarAlertaSimplesPorTipo(ALERT_TYPE.ERROR, 'Ocurrio un error al realizar la actualización', "Error inesperado");
          return of(
            {
              "Data": null,
              "Meta": {
                "StatusCode": 500,
                "ResultadoExitoso": false,
                "TipoRespuesta": "Error de base de datos"
              }
            }
          );
        })
      );

  }

  //Elimina un parametro del sistema
  deleteUserById(id_user: string): Observable<any> {
    return this.http.delete(URL_USERS + '/' + id_user, {}).pipe(
      map((resp: any) => {
        return {
          Data: resp,
          Meta: {
            StatusCode: 200,
            ResultadoExitoso: true,
            TipoRespuesta: '',
          },
        };
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la eliminación del usuario',
          'Error inesperado'
        );
        return of({
          Data: null,
          Meta: {
            StatusCode: 500,
            ResultadoExitoso: false,
            TipoRespuesta: msg,
          },
        });
      })
    );
  }

  getErrorResponse(error: any): string {
    let msg = '';
    let errors = error.errors;
    if (errors) {
      for (var i = 0; i < errors.length; i++) {
        msg += errors[i].field + ' : ' + errors[i].message + '\n';
      }
    } else if (error.message) {
      msg = error.message;
    }
    return msg;
  }

  //Obtiene usuario por id activo en el sistema
  loginLocalUser(user: any): Observable<any> {
    user = {email:'admin@admin.com'}
    return this.http.post(URL_AUTH, user )
      .pipe(
        map((resp: any) => {
          if(resp.token){
          this.saveSessionStorage('token', resp.token);
          let VariablesDeUsuarioLogadoDTO = {
            email:"admin@admin.com"
          };
          this.saveSessionStorage(
            'variablesDeUsuarioLogadoDTO',
            VariablesDeUsuarioLogadoDTO
          );
          this.router.navigate(['']);
          }
          return resp;
        }),
        catchError(error => {
          $('.preloader').hide();
          this._alerService.mostrarAlertaSimplesPorTipo(ALERT_TYPE.ERROR, 'Ocurrio un error al realizar LogIn', "Error inesperado");
          return of(
            {
              "Data": null,
              "Meta": {
                "StatusCode": 500,
                "ResultadoExitoso": false,
                "TipoRespuesta": "Error LogIn"
              }
            }
          );
        })
      );

  }


}
