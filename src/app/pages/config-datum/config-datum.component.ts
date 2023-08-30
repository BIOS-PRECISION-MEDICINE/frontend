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
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstDatum: any = [];

  constructor(private fb: FormBuilder,private _datum_service: DatumService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._datum_service.getListingDatum(page).subscribe(resp => {
      this.lstDatum = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
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
