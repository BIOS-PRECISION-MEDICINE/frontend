import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

//Interfaces
import { ResponseApi } from '../interfaces/responseApi';
import { Role } from '../models/role.model';
import { ALERT_TYPE } from '../constants/alerts.constans';

const URL_ROLES = environment.url_api_roles;
const per_page : number = environment.pagination_size;  

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de roles activos en el sistema, paginado
  getListingRoles(current_page: number):Observable<ResponseApi>{
    let url = URL_ROLES+'?page='+current_page+'&per_page='+per_page;

    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

  //Obtiene listado de roles activos en el sistema
  getAllListingRoles():Observable<ResponseApi>{
    let url = URL_ROLES+'?page=1&per_page=100';

    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

    //Crea e inserta un nuevo rol en el sistema
    createNewRole(role: Role): Observable<any> {

      return this.http.post(URL_ROLES + "/", role)
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
            return of(
              {
                "Data": null,
                "Meta": {
                  "StatusCode": 500,
                  "ResultadoExitoso": false,
                  "TipoRespuesta": "Ocurrio un error al realizar la actualización"
                }
              }
            );
          })
        );
  
    }

    //Elimina un rol del sistema
    deleteRoleById(id_role: string): Observable<any> {
    return this.http.delete(URL_ROLES + '/' + id_role, {}).pipe(
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
    else if (error.error) {
      msg = error.error;
    }
    return msg;
  }
}
