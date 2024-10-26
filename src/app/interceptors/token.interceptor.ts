import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

declare var $: any;

@Injectable({
  providedIn: "root",
})
export class TokenInterceptor implements HttpInterceptor {

  token: string = '';
  constructor(private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Si las rutas son de auth no se clonan.
    // if (
    //   request.url.indexOf("api/Login/Authenticate") >= 0 ||
    //   request.url.indexOf("ActiveDirectory/LoginFT") >= 0 ||
    //   request.url.indexOf("TokenOrigen") >= 0
    // ) {
    //   let reqCloneSinToken = request.clone();
    //   return next.handle(reqCloneSinToken);
    // }
    

    // Se valida el sistema para agregar el correspondiente token(Core digital o intranet).
    const token = localStorage.getItem('token');
    if (token) {
      console.log("agregando token "+token )
      // Se debe clonar la req para poder usarla multiples veces.
      const reqClone = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`).append('content-type', 'application/json')
      });
      return next.handle(reqClone).pipe(
        catchError((error: HttpErrorResponse) => this.procesarError(error))
      );
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => this.procesarError(error))
    );

  }

  private procesarError(error: HttpErrorResponse) {
    this.router.navigate(["/dashboard"])
    return throwError("");
  }
}
