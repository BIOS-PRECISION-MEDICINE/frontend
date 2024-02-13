import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { DatumSubTaskExamService } from 'src/app/services/datum-subtask-exam.service';

declare var $: any;

@Component({
  selector: 'app-config-exam-subtask-process',
  templateUrl: './config-exam-subtask-process.component.html',
})
export class ConfigExamSubtaskProcessComponent {
  public current_id_subtask_exam: number = -1;
  public current_name_task: string = '';
  public current_name_subtask: string = '';
  public lstDatumSubTaskExam: any = [];

  constructor(
    private _activatedroute:ActivatedRoute,
    private _datum_subTask_exam_service: DatumSubTaskExamService,
    private _alert: AlertPersonalService
  ) {
  }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => {
      this.current_id_subtask_exam = params['id_subtask_exam'];
      this.current_name_task = params['name_task'];
      this.current_name_subtask = params['name_subtask'];
      this.getDatumSubTaskExamByIdSubtaskExam();
  });
  }

  getDatumSubTaskExamByIdSubtaskExam(): void {
    $('.preloader').show();
    this._datum_subTask_exam_service.getDatunSubTaskExamByIdSubtaskExam(this.current_id_subtask_exam).subscribe((resp) => {
      this.lstDatumSubTaskExam = resp;
      console.log(this.lstDatumSubTaskExam);
      $('.preloader').hide();
    });
  }

}
