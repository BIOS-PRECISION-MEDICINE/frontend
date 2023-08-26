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
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstDatum: any = [];

  constructor(private fb: FormBuilder,private _datum_service: DatumService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._datum_service.getListingDatum(page).subscribe(resp => {
      this.lstDatum = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
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
