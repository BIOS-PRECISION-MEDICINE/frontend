import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  // Permite encriptar y devolver una cadena en base64.
  encrypt(text: string): string {
    var Key = CryptoJS.enc.Utf8.parse('KKTTOPLMNBNVU1DWUZCRVFGV1VVT0='); //secret key, no cambiar ya que afecta el back.
    var IV = CryptoJS.enc.Utf8.parse('1693345645678765'); //16 digit
    var encryptedText = CryptoJS.AES.encrypt(text, Key, {
      keySize: 128 / 8,
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encryptedText.toString();
  }

  //Ordenar registros por fecha de forma descendente
  ordenarListaFecha(lista: any[], propiedad: string) {
    let orderByDate: any[] = [];

    if (lista.length > 0) {
      orderByDate = lista.sort((a, b) => {
        if (a[propiedad] == b[propiedad]) {
          return 0;
        }
        if (a[propiedad] > b[propiedad]) {
          return -1;
        }
        return 1;
      });
    }
    return orderByDate;
  }
}
