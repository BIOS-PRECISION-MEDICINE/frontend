import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SubTarea } from 'src/app/models/subtarea.model';
import { SubTareaExamen } from 'src/app/models/subTareaExamen.nodel';
import { Tarea } from 'src/app/models/tarea.model';
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
  urlOutMainDatum: any = {};
  constructor(private route: ActivatedRoute,
    private subtaskService: SubTasksService,
    private subtasksExamService: SubTaskExamService,
    private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.subtaskId = this.route.snapshot.paramMap.get('subtaskId');
    this.examId = this.route.snapshot.paramMap.get('examId');
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
  getSubTasksExam() {
    this.subtasksExamService.listSubTasksExamsByExamAndSubTask(this.examId, this.subtaskId).subscribe(data => {
      this.subTasksExam = data
      //console.log("subtasks exams "+JSON.stringify(this.subTasksExam))
      this.setTab(data[0]["id"],0)
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
    let outMainDatum=this.actualSubTasksExam.data_sub_task_exam?.find(item => item.datum.param.name === "out_report");
    this.urlOutMainDatum=environment.url_main_backend+"/"+outMainDatum["datum"]["value"]
    console.log("res-->" + JSON.stringify(this.urlOutMainDatum))
  }

  getOutReport(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlOutMainDatum);
  } 
  startExecution(){
    this.subTask.input_params.forEach(item => {
      item["value"] = item.default_value;
    });
    console.log(JSON.stringify(this.subTask.input_params))
    //falta llamar el backend para iniciar la tarea
  }
}
