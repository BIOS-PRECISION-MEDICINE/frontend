import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';

declare var $: any;

@Component({
  selector: 'app-details-exam-process',
  templateUrl: './details-exam-process.component.html',
})
export class DetailsExamProcessComponent {
  public id_exam: number = -1;
  public id_process: number = -1;
  public name_exam: string = '';
  public subTask: any[] = [];
  public lstTasks: any[] = [];

  constructor(
    private _router: Router,
    private _subTask_service: SubTasksService,
    private _subTaskExam_service: SubTaskExamService,
    private _activatedroute: ActivatedRoute,
    private _alert: AlertPersonalService
  ) {}

  ngOnInit(): void {
    this._activatedroute.params.subscribe((params) => {
      this.id_exam = params['id_exam'];
      this.id_process = params['id_process'];
      this.name_exam = params['name_exam'];
      this.getLsitingTaskExamByIdExam();
    });
  }

  getLsitingTaskExamByIdExam(): void {
    $('.preloader').show();
    if (this.id_exam) {
      this._subTaskExam_service
        .getSubtaskByIdExam(this.id_exam.toString())
        .subscribe((resp) => {
          this.getListinTaskAndSubTask(resp);
        });
    }
  }

  getListinTaskAndSubTask(lstSubtaskExams: any): void {
    $('.preloader').show();
    this._subTask_service
      .getListingSubTasksByFilters(this.id_process, -1, -1)
      .subscribe((resp) => {
        this.subTask = resp;
        // Iterate through subtasks to find the task and create a new object
        this.subTask.forEach((sub: any) => {
          // Checks for if each subtask it's finished in list of subtest_exam
          let subTaskExam: any = lstSubtaskExams.find((elem: any) => {
            return elem.subtask_id == sub.id;
          });

          let index = this.lstTasks.findIndex(
            (item: any) => item.id === sub.task.id
          );
          if (index === -1) {
            let task: Tarea = sub.task;
            task.subtasks = [];
            this.subTask.forEach((obj) => {
              // Checks and set value for state of the subtask
              if (obj.task_id === sub.task.id) {
                if (subTaskExam) {
                  obj.enable =
                    (subTaskExam.finished_at) ||
                    (subTaskExam.previous_subtask_exam_id &&
                      !subTaskExam.finished_at);
                  obj.id_subtask_exam = subTaskExam.id;
                  obj.state_subtask = !subTaskExam.finished_at
                    ? 'state_yellow'
                    : 'state_green';
                } else {
                  obj.previous = -1;
                  obj.id_subtask_exam = -1;
                  obj.state_subtask = 'state_red';
                }
                task.subtasks.push(obj);
              }
            });

            this.lstTasks.push(task);
          }
        });

        $('.preloader').hide();
      });
  }

  configSubTask(id_subtask_exam: number,name_task:string,name_subtask:string): void {
    this._router.navigate(['/config-exam-subtask-process/'+ + id_subtask_exam+'/'+name_task+'/'+name_subtask]);
  }
}
