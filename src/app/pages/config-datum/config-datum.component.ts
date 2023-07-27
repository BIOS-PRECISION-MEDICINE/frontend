import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { DatumService } from 'src/app/services/datum.service';

declare var $: any;

@Component({
  selector: 'app-config-datum',
  templateUrl: './config-datum.component.html',
  styleUrls: ['./config-datum.component.css']
})
export class ConfigDatumComponent {
  public lstDatum: any = [];

  constructor(private fb: FormBuilder,private _datum_service: DatumService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._datum_service.getListingDatum().subscribe(resp => {
      this.lstDatum = resp.data;
      })
  }

  modalDatumEdit(): void {
    // Se muestra modal.
    $('#DatumNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalDatumConfirmation(): void {
    // Se muestra modal.
    $('#DatumDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newDatum(): void{

  }

  editDatum(): void{

  }

  removeDatum(): void{

  }
}
