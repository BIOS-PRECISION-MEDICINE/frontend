import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import { ExamsService } from 'src/app/services/exam.service';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';

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
    private _subtask_exam_service: SubTaskExamService,
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
    let id_last_subtask: number = -1;
    let order_last_subtask: number = -1;
    // Iterates list of task for get sub Objects for each task
    this.detailsExam.theProcess.tasks.forEach((task: any) => {
      //Iterates list of subtask for get sub Objects for each subtask
      task.subTasks.forEach((subtask: any) => {
        subtask.lst_config_subtask_exec = [];
        subtask.state = subtask.subTaskExam.length == 0 ? 'state_red' : null;
        // Check if exist a previous subtask_exam for set in config
        let prev_subtask_exam = this.detailsExam.theProcess.tasks.find(
          (t: any) => {
            return t.subTasks.find((st: any) => {
              return (
                st.id === id_last_subtask &&
                st.order == order_last_subtask &&
                st.subTaskExam.find((ste: any) => {
                  return ste.finished_at;
                })
              );
            });
          }
        );
        if (prev_subtask_exam) {
          subtask.prevSubTexExam =
            prev_subtask_exam.subTasks[0].lst_config_subtask_exec.map(
              (st: any) => st.id_subtask_exam
            );
          subtask.state = 'state_yellow';
        }

        //Iterates list of subtask_exam for set state of subtask
        subtask.subTaskExam.forEach((subtask_exam: any) => {
          // Creates basic config for each subtask
          subtask.lst_config_subtask_exec.push({
            id_subtask_exam: subtask_exam.id,
          });
          // Configuration of state for subtask_exam
          if (subtask_exam.finished_at) {
            subtask.state = 'state_green';
          } else {
            subtask.state = 'state_yellow';
          }
        });
        //Configuracion nuevo estado, guarda las variables del subtask_exam valor
        id_last_subtask = subtask.id;
        order_last_subtask = subtask.order;
        // Fin configuracion nuevo estado
      });
    });
  }

  SendToConfigExecSubTaskExam(
    task_name: string,
    subtask_name: string,
    id_subtask: number,
    prev_subtex_exam: any,
    lst_config: any
  ): void {
    this._router.navigateByUrl('/config-exec-subtask-exam', {
      state: {
        id_subtask: id_subtask,
        id_exam: this.id_exam,
        task_name: task_name,
        subtask_name: subtask_name,
        prev_subtex_exam: prev_subtex_exam,
        lst_config_subtask_exec: lst_config,
      },
    });
  }
}
