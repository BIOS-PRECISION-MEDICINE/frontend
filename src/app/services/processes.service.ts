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

const URL_PROCESSES = environment.url_api_processes;
const per_page : number = environment.pagination_size;  

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ProcessesService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de procesos activos en el sistema
  getListingProcesses(current_page:number):Observable<ResponseApi>{
    let url = URL_PROCESSES+'?page='+current_page+'&per_page='+per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
