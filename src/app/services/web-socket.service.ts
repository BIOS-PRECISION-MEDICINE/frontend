import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class WebSocketService extends Socket {
  callback:EventEmitter<any>=new EventEmitter();
  nameEvent:string;
  constructor() {
    super({
      url:environment.url_base_api,
      options:{
        // query:{
        //   "id":"id-prueba"
        // }
      }
    })
    this.nameEvent=""
    this.listen()
    
  }
  setNameEvent(nameEvent:string){
    this.nameEvent=nameEvent
    this.listen()
  }
  listen=()=>{
    this.ioSocket.on(this.nameEvent,(res:any)=>this.callback.emit(res))
  }
  // Para llamar este método es necesario inyectar el servicio
  // y enviar el payload
  // emitEvent=(payload={})=>{
  //   this.ioSocket.emit(this.nameEvent,payload)
  // }
}