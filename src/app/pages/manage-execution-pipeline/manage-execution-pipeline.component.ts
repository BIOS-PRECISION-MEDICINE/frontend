import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { SubTarea } from 'src/app/models/subtarea.model';
import { SubTareaExamen } from 'src/app/models/subTareaExamen.nodel';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-execution-pipeline',
  templateUrl: './manage-execution-pipeline.component.html',
  styleUrls: ['./manage-execution-pipeline.component.css']
})
export class ManageExecutionPipelineComponent implements OnInit {
  selectedSubtaskExamId: string = 'Home';
  subtaskId: any;
  examId: any;
  subTask: SubTarea = { id: 0, command: "", task: new Tarea(), name: "", input_params: [], description: "", order: "", created_at: "", output_params: [], task_id: "", updated_at: "" };
  subTasksExam: SubTareaExamen[] = []
  actualSubTasksExam: SubTareaExamen = {}
  executionNumber: number = 0;
  previousSubtaskExamId: any = 0;
  urlOutMainDatum: any = {};
  isModalOpen = false;
  seleccionada: number = 0;
  optionsSubTasks:any=[]
  subtaskExamPreviousId:any=0;

  constructor(private route: ActivatedRoute,
    private subtaskService: SubTasksService,
    private subtasksExamService: SubTaskExamService,
    private sanitizer: DomSanitizer,
    private _alert: AlertPersonalService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("recargado")
        window.location.reload();
      }
    });
    this.subtaskId = this.route.snapshot.paramMap.get('subtaskId');
    this.examId = this.route.snapshot.paramMap.get('examId');
    if (this.route.snapshot.paramMap.get('subtaskExamPreviousId')) {
      this.previousSubtaskExamId = this.route.snapshot.paramMap.get('subtaskExamPreviousId');
      console.log("NUEVO " + this.previousSubtaskExamId)
    }
    console.log("sub task id " + this.subtaskId)
    console.log("exam id " + this.examId)
    this.getSubTask()
    this.getSubTasksExam()

  }
  getSubTask() {
    this.subtaskService.getSubtaskById(this.subtaskId).subscribe(data => {
      console.log(JSON.stringify(data))
      this.subTask = data
      console.log("--->" + JSON.stringify(this.subTask.task.name))
    })
  }
  nextExecution(subtaskExamPreviousId: any) {
    this.subtasksExamService.getNextSubTask(this.examId, this.subtaskId).subscribe(data => {
      console.log("siguiente " + JSON.stringify(data))
      if (data.length == 1) {
        this.router.navigate(['/manage-execution-pipeline/exam/' + this.examId + '/subtask/' + data[0]["id"] + '/previous/' + subtaskExamPreviousId], { queryParams: { reload: new Date().getTime() } })
      } else {
        console.log("varios, se debe seleccionar el siguiente paso")
        this.openModal()
        this.optionsSubTasks=data
        this.subtaskExamPreviousId=subtaskExamPreviousId
      }
    })
  }
  nextExecutionBySelection() {
    this.subtasksExamService.getNextSubTask(this.examId, this.subtaskId).subscribe(data => {
      console.log("siguiente " + JSON.stringify(data))
      this.router.navigate(['/manage-execution-pipeline/exam/' + this.examId + '/subtask/' + this.seleccionada + '/previous/' + this.subtaskExamPreviousId], { queryParams: { reload: new Date().getTime() } })
    })
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  getSubTasksExam() {
    this.subtasksExamService.listSubTasksExamsByExamAndSubTask(this.examId, this.subtaskId).subscribe(data => {
      this.subTasksExam = data
      if (data.length > 0) {
        //console.log("subtasks exams "+JSON.stringify(this.subTasksExam))
        this.setTab(data[0]["id"], 0)
      }

    })
  }
  getInputTypeFromDatumType(type: string) {
    if (type == "integer") {
      return "number"
    } else if (type == "string") {
      return "text"
    } else if (type == "file") {
      return "file"
    }
    return ""
  }

  setTab(subtaskExamId: string, indice: number) {
    this.selectedSubtaskExamId = subtaskExamId;
    this.executionNumber = indice
    this.actualSubTasksExam = this.subTasksExam[indice]
    console.log("entrando-->" + JSON.stringify(this.actualSubTasksExam))
    let outMainDatum = this.actualSubTasksExam.data_sub_task_exam?.find(item => item.datum.param.name === "out_report");
    this.urlOutMainDatum = environment.url_main_backend + "/" + outMainDatum["datum"]["value"]
    console.log("res-->" + JSON.stringify(this.urlOutMainDatum))
  }

  getOutReport() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlOutMainDatum);
  }
  startExecution() {
    this.subTask.input_params.forEach(item => {
      item["value"] = item.default_value;
    });
    console.log(JSON.stringify(this.subTask.input_params))
    //falta llamar el backend para iniciar la tarea
    const newList = this.subTask.input_params
      .filter((item: any) => item.default_value !== null && item.default_value !== undefined)
      .map((item: any) => ({
        param_id: item.id as number,
        value: item.default_value as string
      }));

    let payload: SubTareaExamen = {
      "exam_id": this.examId,
      "subtask_id": this.subTask.id,

      "dataSubTaskExam": newList
    }
    if (this.previousSubtaskExamId != 0) {
      payload["previous_subtask_exam_id"] = this.previousSubtaskExamId
    }

    console.log("NUEVA EJECUCIÓN " + JSON.stringify(payload))

    this.subtasksExamService.createNewSubTaskExam(payload).subscribe(data => {
      this._alert.mostrarAlertTipoToast(
        ALERT_TYPE.OK,
        'Sub Tarea Iniciada'
      );
    })

  }
  onSelection(id: number) {
    this.seleccionada = id;
    console.log(`ID seleccionado: ${this.seleccionada}`);
  }
}
