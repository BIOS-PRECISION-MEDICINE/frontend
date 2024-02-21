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
    // Iterates list of task for get sub Objects for each task
    this.detailsExam.theProcess.tasks.forEach((task: any) => {
      //Iterates list of subtask for get sub Objects for each subtask
      this.groupSubTaskByOrder(task.subTasks);
      task.subTasks.forEach((a: any) => {
        a.lst_subtask_exec = [];
        a.state = a.subTaskExam.length == 0 ? 'state_red' : null;
        // Check if exist a previous subtask_exam for set in config
        let prev_subtask_exam = this.setPreviousSuTaskExam(this.detailsExam.theProcess.tasks, task.order, a.order);

        if (prev_subtask_exam.length > 0) {
          a.prevSubTexExam = prev_subtask_exam.map((st: any) => st.id);
          a.state = 'state_yellow';
        }
        else if (task.order === 1 && a.order === 1) {
          a.state = 'state_yellow';
        }

        //Iterates list of subtask_exam for set state of subtask
        a.subTaskExam.forEach((subtask_exam: any) => {
          // Creates list executions prev of subtask
          a.lst_subtask_exec.push({
            id_subtask_exam: subtask_exam.id,
          });
          // Configuration of state for subtask_exam
          if (subtask_exam.finished_at) {
            a.state = 'state_green';
          } else {
            a.state = 'state_yellow';
          }
        });

      });
    });
    this.taskCompletionPercentage(this.detailsExam.theProcess.tasks);
  }

  SendToConfigExecSubTaskExam(
    id_subtask: number,
    prev_subtex_exam: any,
    lst_subtask_exec: any,
  ): void {
    this._router.navigateByUrl('/config-exec-subtask-exam', {
      state: {
        id_patient: this.id_patient,
        id_subtask: id_subtask,
        id_exam: this.id_exam,
        prev_subtex_exam: prev_subtex_exam,
        lst_subtask_exec: lst_subtask_exec
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
        if(sub_task.multiSubTask && ste_finished){
          cpt=total;
        }
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

  setPreviousSuTaskExam(lst_task: any, order_task: number, order_subtask: number): any {
    let tOrderTask: number = order_task;
    let tOrderSubTask: number = order_subtask;
    let lstPrevSubTaskExam: any = [];
    Object.freeze(lst_task);
    if (order_task > 1) {
      if (order_subtask - 1 === 0) {
        tOrderTask -= 1;
        let lstOrder: any = lst_task.find((task: any) => {
          return task.order == tOrderTask;
        }).subTasks?.map((t: any) => {
          return t.order;
        });
        tOrderSubTask = Math.max(...lstOrder);
      }
      else {
        tOrderSubTask -= 1;
      }
      // Search task
      let task: any;
      let subtask: any = [];
      lst_task.forEach((a: any) => {
        if (a.order === tOrderTask) {
          task = a;
        }
      });

      task.subTasks.forEach((b: any) => {
        if (b.order === tOrderSubTask) {
          subtask.push(b);
        }
      });

      subtask.forEach((c: any) => {
        let temp = c.subTaskExam.filter((d: any) => {
          return d.finished_at;
        });
        if (temp.length > 0) {
          lstPrevSubTaskExam = lstPrevSubTaskExam.concat(temp);
        }
      });

      return lstPrevSubTaskExam;
    }
    return [];
  }
}
