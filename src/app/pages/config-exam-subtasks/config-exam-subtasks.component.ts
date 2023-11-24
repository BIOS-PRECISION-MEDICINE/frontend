import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

declare var $: any;

@Component({
  selector: 'app-config-exam-subtasks',
  templateUrl: './config-exam-subtasks.component.html',
  styleUrls: ['./config-exam-subtasks.component.css'],
})
export class ConfigExamSubtasksComponent {
  public current_exam_task: number = -1;
  constructor(
    private _router: Router,
    private _activatedroute:ActivatedRoute,
    private _alert: AlertPersonalService
  ) {
  }

  ngOnInit(): void {
    this._activatedroute.params.subscribe(params => { 
      this.current_exam_task = params['id_exam_subtask']; 
  });
  }

  configSubTask(id_subtask: number): void {
    this._router.navigate(['/config-exam-subtask-process/'+id_subtask]);
  }
}
