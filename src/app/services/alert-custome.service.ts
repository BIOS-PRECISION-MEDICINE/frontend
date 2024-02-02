import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class AlertPersonalService {

  constructor() { }


  mostrarAlertaSimplesPorTipo(tipo: string, mensaje: string, titulo: string) {
    if (tipo === "question") {
      Swal.fire(titulo, mensaje, "question");
    }
    if (tipo === "info") {
      Swal.fire(titulo, mensaje, "info");
    }

    if (tipo === "success") {
      Swal.fire(titulo, mensaje, "success");
    }

    if (tipo === "error") {
      Swal.fire(titulo, mensaje, "error");
    }

    if (tipo === "warning") {
      Swal.fire(titulo, mensaje, "warning");
    }
  }

  showSuccessModalWithTimer(txt: string, time: number) {
    Swal.fire({
      position: "center",
      icon: "success",
      text: txt,
      showConfirmButton: false,
      timer: time,
    });
  }

  showWarningModalWithTimer(txt: string, time: number) {
    Swal.fire({
      position: "center",
      icon: "warning",
      text: txt,
      showConfirmButton: false,
      timer: time,
    });
  }

  // **********************************************************************
  // Alert formato de modal con img : autor:dfcantillo
  // **********************************************************************
  mostrarModalAlert(titulo: string, mensaje: string, img: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      imageUrl: img,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }


  mostrarAlertTipoToast(tipo:string,mensaje:string){
    const Toast: any = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    if(tipo === 'success'){ Toast.fire( {title: mensaje, icon: 'success'}); }
    if(tipo === 'info'){ Toast.fire( {title: mensaje, icon: 'info'}); }
    if(tipo === 'error'){Toast.fire( {title: mensaje, icon: 'error'});  }
    if(tipo === 'warning'){Toast.fire( {title: mensaje,icon: 'warning'});   }
    if(tipo === 'question'){Toast.fire( {title: mensaje, icon: 'question'});  }
  }


}
