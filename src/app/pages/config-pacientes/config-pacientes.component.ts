import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { PatientService } from 'src/app/services/patient.service';

import { ALERT_TYPE } from 'src/app/constants/alerts.constans';

import { Paciente } from 'src/app/models/paciente.model';
import Swal from 'sweetalert2';
import { ValidatorDateGreaterTo } from 'src/app/validators/forms-custom-validators';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-config-pacientes',
  templateUrl: './config-pacientes.component.html',
})
export class ConfigPacientesComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public patient!: Paciente;
  public txt_birth_year: string = '';
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstPatients: any = [];

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _patient_service: PatientService,
    private _alert: AlertPersonalService
  ) {
    this.patient = new Paciente();
    this.crearFormulario();
  }

  get documentNoValido() {
    return (
      this.forms.get('document')?.invalid && this.forms.get('document')?.touched
    );
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get lastnameNoValido() {
    return (
      this.forms.get('lastname')?.invalid && this.forms.get('lastname')?.touched
    );
  }

  get birth_yearNoValido() {
    return (
      this.forms.get('birth_year')?.invalid &&
      this.forms.get('birth_year')?.touched
    );
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      document: ['', Validators.required],
      birth_year: ['', [Validators.required, ValidatorDateGreaterTo(new Date())]],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._patient_service.getListingPatients(page).subscribe((resp) => {
      this.lstPatients = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  sendToDetailExamsByIdPatient(id:number): void{
    this._router.navigate(['/exams-by-patient/'+id]);
  }

  modalClose(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#PatientNew').modal('hide');
  }

  modalAddPatients(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#PatientNew').modal({ backdrop: 'static', keyboard: false });
  }

  modalEditPatient(id_patient: string): void {
    this.edit_state = true;
    this._patient_service.getPatientById(id_patient).subscribe((resp) => {
      this.forms.setValue({
        id: resp.id,
        name: resp.name,
        lastname: resp.lastname,
        document: resp.document,
        birth_year: resp.birth_year.split('T')[0]
      });
      $('#PatientNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalPatientsDetails(id_patient: string): void {
    this._patient_service.getPatientById(id_patient).subscribe((resp) => {
      this.patient = resp;
      this.txt_birth_year = resp.birth_year.split('T')[0];
      this.patient.birth_year = this.txt_birth_year;
      $('#PatientDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newPatient(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    }
    else {
      $('.preloader').show();
      let patient: Paciente = this.forms.value;
      this._patient_service.createNewPatient(patient).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Paciente creado exitosamente.'
          );
          this.changePageTable(1);
        }
        else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  editPatient(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    }
    else {
      $('.preloader').show();
      let patient:Paciente = this.forms.value;
      this._patient_service.updatePatient(patient).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Paciente actualizado exitosamente.'
          );
          this.changePageTable(1);
        }
        else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  removePatient(id_patient: string, document: string): void {

    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el paciente con documento N° ${(document)} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._patient_service.deletePatient(id_patient).subscribe(resp => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Paciente eliminado exitosamente.'
            );
          }
          else {
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );
          }
        });
      }
      $('.preloader').hide();
    })
  }


}
