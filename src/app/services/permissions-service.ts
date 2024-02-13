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

const URL_PERMISSIONS = environment.url_api_permissions;
const per_page : number = environment.pagination_size;  

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de permisos activos en el sistema
  getListingPermissions(current_page:number):Observable<ResponseApi>{
    let url = URL_PERMISSIONS+'?page='+current_page+'&per_page='+per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );

  }

}
