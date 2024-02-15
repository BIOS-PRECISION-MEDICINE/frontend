import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import { ExamsService } from 'src/app/services/exam.service';

declare var $: any;

@Component({
  selector: 'app-details-exam-process',
  templateUrl: './details-exam-process.component.html',
})
export class DetailsExamProcessComponent {
  public id_exam: number = -1;
  public id_process: number = -1;
  public detailsExam!: any;

  constructor(
    private _router: Router,
    private _exam_service: ExamsService,
    private _activatedroute: ActivatedRoute,
    private _alert: AlertPersonalService
  ) {}

  ngOnInit(): void {
    this._activatedroute.params.subscribe((params) => {
      this.id_exam = params['id_exam'];
      this.id_process = params['id_process'];
      this.getDetailsOfProcessExam();
    });
  }

  getDetailsOfProcessExam(): void {
    $('.preloader').show();
    this._exam_service
      .getExamById(this.id_exam.toString())
      .subscribe((resp) => {
        this.detailsExam = resp;
        this.setStateOfSubTaskExam();
        $('.preloader').hide();
      });
  }

  setStateOfSubTaskExam(): void {
    // Iterates list of task for get sub Objects for each task
    this.detailsExam.theProcess.tasks.forEach((task: any) => {
      //Iterates list of subtask for get sub Objects for each subtask
      task.subTasks.forEach((subtask: any) => {
        subtask.lst_config_subtask_exec = [];
        subtask.state = subtask.subTaskExam.length == 0 ? 'state_red' : null;
        //Iterates list of subtask_exam for set state of subtask
        subtask.subTaskExam.forEach((subtask_exam: any) => {
          // Creates basic config for each subtask
          subtask.lst_config_subtask_exec.push({
            subtask_id: subtask.id,
            order: subtask.order,
            name_task: task.name,
            name_subtask: subtask.name,
            id_subtask_exam: subtask_exam.id,
          });
          if (subtask_exam.finished_at && !subtask.state) {
            subtask.state = 'state_green';
          } else if (!subtask.state) {
            subtask.state = 'state_yellow';
          }
        });
      });
    });
  }

  configSubTask(lst_config_subtask_exec: any): void {
    this._router.navigateByUrl('/config-exec-subtask-exam', {
      state: lst_config_subtask_exec,
    });
  }
}
