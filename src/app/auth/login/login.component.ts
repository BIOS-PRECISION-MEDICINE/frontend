import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

// Services.
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from 'src/app/services/message.service';
import { ToolsService } from '../../services/tools.service';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Interfaces and Constants.
import { UserLogin } from 'src/app/models/userLogin.model';
import { Message } from 'src/app/models/message.model';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';
import { googleSignInResponse } from 'src/app/interfaces/googleSignInResponse';
import { environment } from 'src/environments/environment';

export const CLIENT_ID = environment.client_id_google;
// Vars.
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  readonly CLIENT_ID = CLIENT_ID;
  public formSubmitted = false;

  messages: Array<Message> = [];
  msgRequired: string = '';
  responseAuthGoogle: any;

  showPW: boolean = false;
  inputType: string = 'password';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _usuario_service: UsuarioService,
    private ngZone: NgZone,
    private _tooslServe: ToolsService,
    private _alerService: AlertPersonalService,
    private _msjService: MessageService // Se inyecta el servicio para que inicialice los mensajes.
  ) {
    // Mensajes de configuración para mostrar en la app.
    this.messages = JSON.parse(localStorage.getItem('messages')!);
    this.setMessages();
  }

  ngAfterViewInit(): void {
    this._usuario_service.loginGoogle();
  }

  public loginForm = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', Validators.required],
    showPW: [false]
  });

  ngOnInit(): void {
    this._usuario_service.logout();
  }

  login() {
    // Se validan los datos de entrada
    if (this.loginForm.value.login && this.loginForm.value.password) {
      let user: any={
        email: this.loginForm.value.login,
        pws:this.loginForm.value.password
      }
      this._usuario_service.loginLocalUser(user)
      .subscribe((resp:any) => {
          if(resp){
            this._router.navigate(['/dashboard/']);
          }
      });

    }
  }

  showPassword() {
    this.inputType = this.showPW ? 'text' : 'password';
  }

  private setMessages() {
    this.msgRequired = this.messages.filter((x) => {
      return x.type == 'validatorRequired';
    })[0].message;
  }
}
