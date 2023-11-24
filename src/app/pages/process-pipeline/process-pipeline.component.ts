import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Examen } from 'src/app/models/exam.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-process-pipeline',
  templateUrl: './process-pipeline.component.html',
  styleUrls: ['./process-pipeline.component.css']
})
export class ProcessPipelineComponent {
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public exam!: Examen;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstExams: any = [];
  public lstPatients: any = [];

  constructor(
    private _router: Router,
    private _exams_service: ExamsService,
    private _alert: AlertPersonalService
  ) {
    this.exam = new Examen();
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this._exams_service.getListingExams(page).subscribe((resp) => {
      this.lstExams = resp.data;
      this.lstExams[0]['patient_name'] = 'Patricia Andrea,Restrepo Osorio';
      this.lstExams[1]['patient_name'] = 'Manuela,Patiño Osa';
      this.lstExams[2]['patient_name'] = 'David Eduardo,Marin Ospina';
      this.lstExams[2]['current_task'] = '1';
      this.current_page = resp.meta.current_page;
      this.per_page = resp.meta.per_page;
      this.total_items = resp.meta.total;
      $('.preloader').hide();
    });
  }

  sendToDetailExamSubTasks(id_exam_subtask: string): void {
    this._router.navigate(['/config-exam-sub-task/'+id_exam_subtask]);
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
