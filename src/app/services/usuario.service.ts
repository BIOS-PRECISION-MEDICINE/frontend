import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { Usuario } from '../models/usuario.model';
import { UserLogin } from 'src/app/models/userLogin.model';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { MESSAGES } from 'src/app/constants/messages.constants';
import { environment } from '../../environments/environment';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';
import { googleSignInResponse } from 'src/app/interfaces/googleSignInResponse';

const URL_AUTH = environment.url_auth;
const CLIENT_ID = environment.client_id_google;
const URL_BASE = environment.url_base;
const URL_LOGIN = environment.url_login;

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
  ) {}

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

  validarToken(): Observable<boolean> {
    this.loginUsuario = JSON.parse(
      sessionStorage.getItem('variablesDeUsuarioLogadoDTO')!
    ).UsuarioLogado.Login;

    return this.http
      .get(`${URL_AUTH}Token/RenovarToken?login=${this.loginUsuario}`)
      .pipe(
        map((resp: any) => {
          this.usuario = new Usuario(
            'nombre',
            'email',
            '',
            'img',
            false,
            'USER_ROLE',
            'uid'
          );

          this.saveSessionStorage('token', resp.Token);

          return true;
        }),
        catchError((error) => of(false))
      );
  }

  //Autenticación con usuarios locales en el sistema
  login(userLogin: UserLogin) {
    let login: any = {};
    let url: string = '';
    login = { UserName: userLogin.Login, Password: userLogin.Password };
    url = `${URL_AUTH}Authetication`;
    return this.http.post(`${url}`, login).pipe(
      map((respuesta: any) => {
        if (respuesta) {
          // Se valida a donde se hace la petición, ya que el objeto de respuesta cambia.
          if (url.includes('ActiveDirectory')) {
            return respuesta.Datos;
          }
          return respuesta;
        }
      }),
      filter((valor: any, index) => {
        if (valor.VariablesDeUsuarioLogadoDTO.UsuarioLogado) {
          this.usuario = new Usuario(
            valor.VariablesDeUsuarioLogadoDTO.UsuarioLogado.NombreCompleto,
            valor.VariablesDeUsuarioLogadoDTO.UsuarioLogado.Email
          );
          this.saveSessionStorage('token', valor.Token);
          this.saveSessionStorage(
            'variablesDeUsuarioLogadoDTO',
            valor.VariablesDeUsuarioLogadoDTO
          );
          return valor;
        } else if (valor.TipoRespuesta === 'No autorizado!!') {
          let tipoAlert: string =
            valor.VariablesDeUsuarioLogadoDTO.ErrorUsuario ===
            'El usuario se encuentra bloqueado para acceder.'
              ? 'error'
              : 'info';
          let titulo =
            valor.VariablesDeUsuarioLogadoDTO.ErrorUsuario ===
            'El usuario se encuentra bloqueado para acceder.'
              ? 'Bloqueado'
              : 'Credenciales';
          this._alerService.mostrarAlertaSimplesPorTipo(
            tipoAlert,
            valor.VariablesDeUsuarioLogadoDTO.ErrorUsuario,
            titulo
          );
        } else if (valor.TipoRespuesta !== 'Ok') {
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            'El usuario no cuenta con permisos para acceder al sistema',
            'Permisos'
          );
        } else {
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            MESSAGES.OPERATION_ERROR,
            'Error inesperado'
          );
        }
        $('.preloader').hide();
      }),
      catchError((err: any) => {
        if (typeof err === 'string') {
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            err,
            'Ups!'
          );
        } else if (typeof err.error === 'string') {
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            err.error,
            'Ups!'
          );
        } else {
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            MESSAGES.OPERATION_ERROR,
            'Error inesperado'
          );
        }
        $('.preloader').hide();
        return err;
      })
    );
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
    if (permiso === 0 || permiso === undefined) {
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
    return false;
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
    this.router.navigate(['/dashboard']);
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

}
