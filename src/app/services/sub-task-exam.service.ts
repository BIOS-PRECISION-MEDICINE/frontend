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
import { SubTarea } from '../models/subtarea.model';
import { ALERT_TYPE } from '../constants/alerts.constans';
import { SubTareaExamen } from '../models/subTareaExamen.nodel';

const URL_SUBTASKS_EXAM = environment.url_api_subtask_exam;
const URL_SUBTASKS_EXAM_OUTPUT = environment.url_api_subtask_exam_output;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class SubTaskExamService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene subTareaExam especificada por id_exam activo en el sistema
  getSubTaskExamByLstId(lst_subtask_exam_id: string): Observable<any> {
    let url =
      URL_SUBTASKS_EXAM + '/?lst_subtask_exam_id=' + lst_subtask_exam_id;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene subTareaExam especificada por id_exam activo en el sistema
  getSubtaskByIdExam(id_exam: string): Observable<any> {
    let url =
      URL_SUBTASKS_EXAM + '?id_exam=' + id_exam + '&page=1&per_page=100';
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }

  //Obtiene resultados de subTareaExam especificada por id_exam activo en el sistema
  getResultOfSubtaskByIdExam(id_subtask_exam: string): Observable<any> {
    let url =
      URL_SUBTASKS_EXAM_OUTPUT + '/'+id_subtask_exam;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        return of(null);
      })
    );
  }

  //Crea e inserta una nueva subtarea-exam en el sistema
  createNewSubTaskExam(subtareaExam: SubTareaExamen): Observable<any> {
    return this.http.post(URL_SUBTASKS_EXAM + '/', subtareaExam, {}).pipe(
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
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la creación de una subtarea',
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

  //Actualiza una subtarea-exam en el sistema
  updateSubTask(subtareaExam: SubTareaExamen): Observable<any> {
    return this.http
      .put(URL_SUBTASKS_EXAM + '/' + subtareaExam.id, subtareaExam, {})
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
        catchError((error) => {
          $('.preloader').hide();
          let msg = this.getErrorResponse(error);
          this._alerService.mostrarAlertaSimplesPorTipo(
            ALERT_TYPE.ERROR,
            'Ocurrio un error al realizar la edición una subTarea-Exam',
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

  //Elimina una subTarea del sistema
  deleteSubTask(id_subtareaExam: string): Observable<any> {
    return this.http.delete(URL_SUBTASKS_EXAM + '/' + id_subtareaExam, {}).pipe(
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
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la eliminación de una subtarea',
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
