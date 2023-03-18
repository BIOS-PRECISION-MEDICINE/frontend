import { Injectable } from '@angular/core';

// Models.
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Array<Message> = [];

  constructor() {
    this.saveLocalStorage('messages',  this.loadMessage());
  }

  // TODO: Los mensajes de validación deben venir desde una BBDD.
  loadMessage(): Array<Message>{
    return this.messages = [
      {
        type:'validatorPatternEmail',
        message: 'Debe ser un correo válido'
      },
      {
        type:'validatorRequired',
        message: 'Campo requerido'
      },
      {
        type:'validatorInvalidCharacter',
        message: 'Carácter no válido'
      },
      {
        type:'validatorOnlyNumbers',
        message: 'Solo números'
      },
      {
        type:'alertMessageInfo',
        message: '¡Operación exitosa!'
      },
      {
        type:'alertMessageError',
        message: '¡Error en la operación!'
      },
    ];
  }

  saveLocalStorage(nameObject: string, object: any){
    localStorage.setItem(nameObject, JSON.stringify(object));
  }
}
