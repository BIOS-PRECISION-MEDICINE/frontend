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
  styleUrls: ['./config-exams.component.css'],
})
export class ConfigExamsComponent {
  public isOK: boolean = true;
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
      name: ['', Validators.required],
      patient_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.changePageTable(1);
    this._patients_service.getAllListingPatients().subscribe((resp) => {
      this.lstPatients = resp.data;
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._exams_service.getListingExams(page).subscribe((resp) => {
      this.lstExams = resp.data;
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  modalClose(): void {
    this.edit_state = false;
    this.forms.reset();
    $('#ExamNew').modal('hide');
  }

  modalAddExam(): void {
    this.edit_state = false;
    this._patients_service.getAllListingPatients().subscribe((resp) => {
      this.lstPatients = resp.data;
      this.forms.reset();
      $('#ExamNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalEditExam(id_examen: string): void {
    this.edit_state = true;
    this._exams_service.getExamById(id_examen).subscribe((resp) => {
      this.exam = resp;
      $('#ExamNew').modal({ backdrop: 'static', keyboard: false });
    });
  }

  modalDetailsExam(id_task: string): void {
    this._exams_service.getExamById(id_task).subscribe((resp) => {
      this.exam = resp;
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

      this._exams_service.createNewExam(this.exam).subscribe((resp) => {
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
      this._exams_service.updateExam(this.exam).subscribe((resp) => {
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
