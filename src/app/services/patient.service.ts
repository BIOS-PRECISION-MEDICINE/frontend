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

const URL_PATIENTS = environment.url_api_patient;
const per_page : number = environment.pagination_size;  

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

  //Obtiene listado de tareas activos en el sistema
  getListingPatients(current_page:number):Observable<ResponseApi>{
    let url = URL_PATIENTS+'?page='+current_page+'&per_page='+per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
