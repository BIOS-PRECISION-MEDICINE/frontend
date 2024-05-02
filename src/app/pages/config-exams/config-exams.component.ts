import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Examen } from 'src/app/models/exam.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-config-exams',
  templateUrl: './config-exams.component.html',
})
export class ConfigExamsComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public exam!: Examen;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstExams: any = [];
  public lstPatients: any = [];

  constructor(
    private fb: FormBuilder,
    private _exams_service: ExamsService,
    private _patients_service: PatientService,
    private _alert: AlertPersonalService
  ) {
    this.exam = new Examen();
    this.crearFormulario();
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get patientNoValido() {
    return (
      this.forms.get('patient_id')?.invalid &&
      this.forms.get('patient_id')?.touched
    );
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id: [],
      name: ['', Validators.required],
      patient_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    $('.preloader').show();
    this._patients_service.getAllListingPatients().subscribe((resp) => {
      this.lstPatients = resp.data;
      this.changePageTable(1);
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._exams_service.getListingExams(page).subscribe((resp) => {
      this.lstExams = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;

      // Sets name of patient for each exam in list
      this.lstExams.forEach((item: any) => {
        let patient: any = this.lstPatients.find((obj: any) => {
          return obj.id === item.patient_id;
        });
        item.patient_name = patient.name + ' '+ patient.lastname;
      });
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.forms.reset();
    this.edit_state = false;
    $('#ExamNew').modal('hide');
  }

  modalAddExam(): void {
    this.edit_state = false;
    this._patients_service.getAllListingPatients().subscribe((resp) => {
      this.forms.reset();
      this.lstPatients = resp.data;
      $('#ExamNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalEditExam(id_examen: string): void {
    this.edit_state = true;
    this._exams_service.getExamById(id_examen).subscribe((resp) => {
      this.forms.setValue({
        id: resp.id,
        name: resp.name,
        patient_id: resp.patient_id
      });
      $('#ExamNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsExam(id_task: string): void {
    this._exams_service.getExamById(id_task).subscribe((resp) => {
      this.exam = resp;
      let patient: any = this.lstPatients.find((obj: any) => {
        return obj.id === resp.patient_id;
      });
      this.exam.patient_name = patient.name + ' '+ patient.lastname;
      $('#ExamDetails').modal({ backdrop: 'static', keyboard: false });
    });
  }

  newExam(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let exam:Examen = this.forms.value;
      this._exams_service.createNewExam(exam).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Examen creado exitosamente.'
          );
          this.changePageTable(1);
        } else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  editExam(): void {
    if (!this.forms.valid) {
      this.forms.markAllAsTouched();
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.WARNING,
        'Por favor llene los campos obligatorios.'
      );
    } else {
      $('.preloader').show();
      let exam: Examen = this.forms.value;
      this._exams_service.updateExam(exam).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          this.modalClose();
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.OK,
            'Examen actualizado exitosamente.'
          );
          this.changePageTable(1);
        } else {
          this._alert.mostrarAlertTipoToast(
            ALERT_TYPE.ERROR,
            resp.Meta.TipoRespuesta
          );
        }
      });
    }
    $('.preloader').hide();
  }

  removeExam(id_task: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar la examen con id N° ${id_task} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._exams_service.deleteExam(id_task).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Examen eliminado exitosamente.'
            );
          } else {
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );
          }
        });
      }
      $('.preloader').hide();
    });
  }
}
