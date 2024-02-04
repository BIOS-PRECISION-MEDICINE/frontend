import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

//Interfaces
import { ResponseApi } from '../interfaces/responseApi';
import { ALERT_TYPE } from '../constants/alerts.constans';
import { Parametro } from '../models/parametro.model';

const URL_PROCESS_PIPELINE = environment.url_api_process_pipeline;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ProcessPipelineService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de todos procesos pipeline activos en el sistema
  getListingAllProcessPipeline(): Observable<ResponseApi> {
    let url = URL_PROCESS_PIPELINE + '?page=1&per_page=1000';
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de procesos pipeline activos en el sistema
  getListingProcessPipeline(current_page: number): Observable<ResponseApi> {
    let url =
      URL_PROCESS_PIPELINE + '?page=' + current_page + '&per_page=' + per_page;
    /*
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
    */
    return of({
      meta:{
        current_page: 1,
        first_page: 1,
        first_page_url: 'string',
        last_page: 1,
        last_page_url: 'string',
        next_page_url: 'string',
        per_page: 10,
        previous_page_url:'string',
        total: 1
      },
      data: [
        {
          id_exam: 1,
          name_exam: 'pruebas 1',
          id_patient: 2,
          name_patient: 'pedro pablo',
          id_current_task: 3,
          name_current_task: 'Mapeo',
          updated_at: new Date()
        }
      ]
  });
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
}
