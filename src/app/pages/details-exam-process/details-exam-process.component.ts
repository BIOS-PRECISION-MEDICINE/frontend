import { filter } from 'rxjs/operators';
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
  ) { }

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
        //Order task
        resp.theProcess.tasks.sort((a: any, b: any) => {
          return a.order - b.order;
        });
        // Order subTask
        resp.theProcess.tasks.forEach((task: any) => {
          task.subTasks.sort((a: any, b: any) => {
            return a.order - b.order;
          });
        });

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
      this.groupSubTaskByOrder(task.subTasks);
      for (let i = 0; i < task.subTasks.length; i++) {
        task.subTasks[i].lst_config_subtask_exec = [];
        task.subTasks[i].state =
          task.subTasks[i].subTaskExam.length == 0 ? 'state_red' : null;
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
          task.subTasks[i].prevSubTexExam = prev_subtask_exam.subTasks
            .find((step: any) => {
              return (
                step.id === id_last_subtask && step.order == order_last_subtask
              );
            })
            .lst_config_subtask_exec.map((st: any) => st.id_subtask_exam);
          task.subTasks[i].state = 'state_yellow';
        }

        //Iterates list of subtask_exam for set state of subtask
        task.subTasks[i].subTaskExam.forEach((subtask_exam: any) => {
          // Creates basic config for each subtask
          task.subTasks[i].lst_config_subtask_exec.push({
            id_subtask_exam: subtask_exam.id,
          });
          // Configuration of state for subtask_exam
          if (subtask_exam.finished_at) {
            task.subTasks[i].state = 'state_green';
          } else {
            task.subTasks[i].state = 'state_yellow';
          }
        });

        if (task.subTasks[i].multiSubTask) {
          if (i == task.subTasks.length - 1) {
            id_last_subtask = task.subTasks[i].id;
            order_last_subtask = task.subTasks[i].order;
            task.subTasks.forEach((item: any) => {
              item.state = task.subTasks[i].state;
            });
          }
        } else {
          id_last_subtask = task.subTasks[i].id;
          order_last_subtask = task.subTasks[i].order;
        }
      }
    });
    this.taskCompletionPercentage(this.detailsExam.theProcess.tasks);
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

  taskCompletionPercentage(lstTasks: any): void {
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

  groupSubTaskByOrder(lstSubtask: any): any {
    let lstOrder: any[] = [];
    // Get unique value for order property
    lstSubtask.forEach((st: any) => {
      if (
        !lstOrder.find((order: any) => {
          return order == st.order;
        })
      ) {
        lstOrder.push(st.order);
      }
    });
    // Loop lstOrder
    lstOrder.forEach((order: any) => {
      let sto: any = lstSubtask.filter((st: any) => {
        return st.order == order;
      });
      if (sto.length > 1) {
        sto.forEach((stg: any) => {
          lstSubtask.find((st: any) => {
            return st.id == stg.id;
          }).multiSubTask = true;
        });
      }
    });
  }
}
