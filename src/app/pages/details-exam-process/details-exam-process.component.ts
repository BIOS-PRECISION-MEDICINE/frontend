import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamsService } from 'src/app/services/exam.service';

declare var $: any;

@Component({
  selector: 'app-details-exam-process',
  templateUrl: './details-exam-process.component.html',
})
export class DetailsExamProcessComponent {
  public id_exam: number = -1;
  public id_patient: number = -1;
  public id_process: number = -1;
  public detailsExam!: any;

  constructor(
    private _router: Router,
    private _exam_service: ExamsService,
    private _activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedroute.params.subscribe((params) => {
      this.id_exam = params['id_exam'];
      this.id_process = params['id_process'];
      this.id_patient = params['id_patient'];
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
    this.TaskCompletionPercentage(this.detailsExam.theProcess.tasks);
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
        id_patient: this.id_patient,
        id_subtask: id_subtask,
        id_exam: this.id_exam,
        task_name: task_name,
        subtask_name: subtask_name,
        prev_subtex_exam: prev_subtex_exam,
        lst_config_subtask_exec: lst_config,
      },
    });
  }

  sendToPreviousPage(): void {
    this._router.navigate(['/exams-by-patient/' + this.id_patient]);
  }

  TaskCompletionPercentage(lstTasks: any): void {
    lstTasks.forEach((task: any) => {
      let total: number = task.subTasks.length;
      let cpt: number = 0;
      task.subTasks.forEach((sub_task: any) => {
        let ste_finished: any = sub_task.subTaskExam.find((ste: any) => {
          return ste.subtask_id == sub_task.id && ste.finished_at;
        });
        cpt += ste_finished ? 1 : 0;
      });
      let per = cpt > 0 ? (cpt * 100) / total : 0;
      task.per_finished = Math.trunc(per);
    });
  }
}
