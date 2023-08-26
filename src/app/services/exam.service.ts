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

const URL_EXAMS = environment.url_api_exam;
const per_page : number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ExamsService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de examenes activos en el sistema
  getListingExams(current_page:number):Observable<ResponseApi>{
    let url = URL_EXAMS+'?page='+current_page+'&per_page='+per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
