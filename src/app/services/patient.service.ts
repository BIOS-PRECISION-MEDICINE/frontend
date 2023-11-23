import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { environment } from '../../environments/environment';
import { Paciente } from '../models/paciente.model';
import { ALERT_TYPE } from '../constants/alerts.constans';

//Interfaces
import { ResponseApi } from '../interfaces/responseApi';

const URL_PATIENTS = environment.url_api_patient;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de pacientes activos en el sistema
  getListingPatients(current_page: number): Observable<ResponseApi> {
    let url = URL_PATIENTS + '?page=' + current_page + '&per_page=' + per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

    //Obtiene listado de pacientes activos en el sistema
    getAllListingPatients(): Observable<ResponseApi> {
      let url = URL_PATIENTS + '?page=1&per_page=1000';
      return this.http.get<ResponseApi>(url).pipe(
        map((resp) => {
          return resp;
        })
      );
    }

    //Obtiene paciente especificado por id activo en el sistema
    getPatientById(id_patient: string): Observable<any> {
      let url = URL_PATIENTS + '/'+id_patient;
      return this.http.get<any>(url).pipe(
        map((resp) => {
          return resp;
        })
      );
    }

  //Crea e inserta un nuevo paciente en el sistema
  createNewPatient(patient: Paciente): Observable<any> {
    return this.http.post(URL_PATIENTS + '/', patient, {}).pipe(
      map((resp: any) => {
        return {
          Data: resp,
          Meta: {
            StatusCode: 200,
            ResultadoExitoso: true,
            TipoRespuesta: '',
          }
        };
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg= this.getErrorResponse(error.errors);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la creación del paciente',
          'Error inesperado'
        );
        return of({
          Data: null,
          Meta: {
            StatusCode: 500,
            ResultadoExitoso: false,
            TipoRespuesta: msg,
          }
        });
      })
    );
  }

  //Actualiza un paciente en el sistema
  updatePatient(patient: Paciente): Observable<any> {
    return this.http.put(URL_PATIENTS + '/'+patient.id, patient, {}).pipe(
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
        let msg= this.getErrorResponse(error.errors);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la edición del paciente',
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

  //Elimina un paciente del sistema
  deletePatient(id_patient: string): Observable<any> {
    return this.http.delete(URL_PATIENTS + '/'+id_patient, {}).pipe(
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
        let msg= this.getErrorResponse(error.errors);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al eliminar el paciente',
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

  getErrorResponse(errors:[any]): string{
    let msg='';
    for(var i=0; i<errors.length;i++){
      msg+= errors[i].field + ' : '+ errors[i].message + '\n';
    }
    return msg;
  }
}
