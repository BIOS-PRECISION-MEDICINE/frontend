import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Paciente } from 'src/app/models/paciente.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-exams-by-patient',
  templateUrl: './exams-by-patient.component.html',
})
export class ExamsByPatientComponent {
  public id_patient: number = -1;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public patient!: Paciente;
  public lstExams: any = [];

  constructor(
    private _router: Router,
    private _activatedroute:ActivatedRoute,
    private _exam_service: ExamsService,
    private _patient_service: PatientService,
    private _alert: AlertPersonalService
  ) {
    this.patient =new Paciente();
  }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      this.id_patient = params['id_patient'];
      if(this.id_patient !== -1){
        this.getListingExamsByPatient(this.id_patient.toString());
      }
    });
  }

  getListingExamsByPatient(id: string): any {
    $('.preloader').show();
    this._patient_service.getPatientById(id).subscribe((resp) => {
      this.patient = resp;
      this.lstExams = resp.exams,
      this.total_items = resp.exams?.length;
      $('.preloader').hide();
    });
  }

  changePageTable(page:number): void {
    this.current_page = page;
  }

  sendToConfigExamenProcess(): void{
    this._router.navigate(['/config-new-instance-pipeline/'+this.patient.id]);
  }

  sendToDetailExamSubTasks(id:number,id_process:number): void{
    this._router.navigate(['/details-exam-process/'+id+'/'+id_process+'/'+this.id_patient]);
  }

  sendToPreviousPage(): void{
    this._router.navigate(['/config-pacientes/']);
  }

  removeExam(id_examen: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar el examen con id N° ${id_examen} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._exam_service.deleteExam(id_examen).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {

            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Examen eliminado exitosamente.'
            );
            if(this.id_patient !== -1){
              this.getListingExamsByPatient(this.id_patient.toString());
            }
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
