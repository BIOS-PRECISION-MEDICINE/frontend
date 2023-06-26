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

const URL_SUBTASKS = environment.url_api_subtasks;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class SubTasksService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de tareas activos en el sistema
  getListingSubTasks():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(URL_SUBTASKS).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
