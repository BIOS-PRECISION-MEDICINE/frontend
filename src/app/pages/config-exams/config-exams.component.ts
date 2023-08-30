import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';

declare var $: any;

@Component({
  selector: 'app-config-exams',
  templateUrl: './config-exams.component.html',
  styleUrls: ['./config-exams.component.css']
})
export class ConfigExamsComponent {
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstExams: any = [];

  constructor(private fb: FormBuilder,private _exams_service: ExamsService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._exams_service.getListingExams(page).subscribe(resp => {
      this.lstExams = resp.data;
      this.current_page =resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      });
  }

  modalExamsEdit(): void {
    // Se muestra modal.
    $('#ExamsNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalExamsConfirmation(): void {
    // Se muestra modal.
    $('#ExamsDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newExams(): void{

  }

  editExams(): void{

  }

  removeExams(): void{

  }
}
