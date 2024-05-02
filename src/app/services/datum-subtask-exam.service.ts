import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

//Interfaces
import { ResponseApi } from '../interfaces/responseApi';

const URL_DATOS_SUBTASK_EXAM = environment.url_api_data_subtask_exam;
const per_page : number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class DatumSubTaskExamService {

  constructor(
    private http: HttpClient,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de datos activos en el sistema
  getListingDataSubTaskExam(current_page:number):Observable<ResponseApi>{
    let url = URL_DATOS_SUBTASK_EXAM+'?page='+current_page+'&per_page='+per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de los datos para los parámetros filtardo por id_subTask_exam
  getDatunSubTaskExamByIdSubtaskExam(id_subTask_exam: number): Observable<any> {
    let url = URL_DATOS_SUBTASK_EXAM + '?subtask_exam_id=' + id_subTask_exam+ '&page=1&per_page=100';
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }

}
