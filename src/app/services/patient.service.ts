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

const URL_PROCESSES = environment.url_api_patient;

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
  getListingPatients():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(URL_PROCESSES).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
