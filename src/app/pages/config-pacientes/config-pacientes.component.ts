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
  public lstPatients: any = [];

  constructor(private fb: FormBuilder,private _patient_service: PatientService, private _alert: AlertPersonalService) {

  }
  ngOnInit(): void {
    this._patient_service.getListingPatients().subscribe(resp => {
      this.lstPatients = resp.data;
      })
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