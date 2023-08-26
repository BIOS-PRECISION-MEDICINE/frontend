import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { PatientService } from 'src/app/services/patient.service';

declare var $: any;

@Component({
  selector: 'app-config-pacientes',
  templateUrl: './config-pacientes.component.html',
  styleUrls: ['./config-pacientes.component.css']
})
export class ConfigPacientesComponent {
  p: number = 1;
  ipp: number = 10;
  ti: number = 0;
  public lstPatients: any = [];

  constructor(private fb: FormBuilder,private _patient_service: PatientService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void{
    this._patient_service.getListingPatients(page).subscribe(resp => {
      this.lstPatients = resp.data;
      this.p = resp.meta.current_page;
      this.ipp = resp.meta.per_page;
      this.ti =resp.meta.total;
      });
  }

  modalPatientsEdit(): void {
    // Se muestra modal.
    $('#PatientNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalPatientsConfirmation(): void {
    // Se muestra modal.
    $('#PatientDelete').modal({ backdrop: 'static', keyboard: false });
  }

  newPatient(): void{

  }

  editPatient(): void{

  }

  removePatient(): void{

  }
}