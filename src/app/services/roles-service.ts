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
import { Permissions } from '../interfaces/permission';
import { ResponseApi } from '../interfaces/responseApi';

const URL_ROLES = environment.url_api_roles;

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

  //Obtiene listado de roles activos en el sistema
  getListingRoles():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(URL_ROLES).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
