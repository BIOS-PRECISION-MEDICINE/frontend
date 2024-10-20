import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { SubTarea } from 'src/app/models/subtarea.model';
import { SubTareaExamen } from 'src/app/models/subTareaExamen.nodel';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import { environment } from 'src/environments/environment';

declare var $: any;
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
  idSubTareaSeleccionada: number = 0;
  optionsSubTasks: any = []
  subtaskExamPreviousId: any = 0;
  public detailsExam!: any;

  constructor(private route: ActivatedRoute,
    private subtaskService: SubTasksService,
    private subtasksExamService: SubTaskExamService,
    private sanitizer: DomSanitizer,
    private _alert: AlertPersonalService,
    private router: Router,
    private _exam_service: ExamsService) {

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
    this.getDetailsOfProcessExam();
  }
  getDetailsOfProcessExam(): void {
    $('.preloader').show();
    this._exam_service
      .getExamById(this.examId.toString())
      .subscribe((resp) => {
        
        this.detailsExam = resp;
        console.log("detalles "+JSON.stringify(this.detailsExam))
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
        this.optionsSubTasks = data
        console.log("aqui-->" + JSON.stringify(this.optionsSubTasks))
        this.subtaskExamPreviousId = subtaskExamPreviousId
      }
    })
  }
  nextExecutionBySelection() {
    this.subtasksExamService.getNextSubTask(this.examId, this.subtaskId).subscribe(data => {
      console.log("siguiente " + JSON.stringify(data))
      this.router.navigate(['/manage-execution-pipeline/exam/' + this.examId + '/subtask/' + this.idSubTareaSeleccionada + '/previous/' + this.subtaskExamPreviousId], { queryParams: { reload: new Date().getTime() } })
    })
  }
  SendToConfigExecSubTaskExam(subtask:any,previous_subtask_exam_id:any): void {
    this.router.navigate(['/manage-execution-pipeline/exam/'+this.examId+'/subtask/'+ subtask+ '/previous/' + previous_subtask_exam_id], { queryParams: { reload: new Date().getTime() } });
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
    console.log("iniciando ejecucion")
    this.subTask.input_params.forEach(item => {
      item["value"] = item.default_value;
    });
    //console.log(JSON.stringify(this.subTask.input_params))
    //falta llamar el backend para iniciar la tarea
    const newList = this.subTask.input_params
      .filter((item: any) => item.default_value !== null && item.default_value !== undefined)
      .map((item: any) => ({
        param_id: item.id as number,
        value: item.default_value as string
      }));

    // if(this.optionsSubTasks.length>0){

    //   payload = {
    //     "exam_id": this.examId,
    //     "subtask_id": this.idSubTareaSeleccionada,
    //     "dataSubTaskExam": newList
    //   }
    // }else{
    let payload: SubTareaExamen = {
      "exam_id": this.examId,
      "subtask_id": this.subTask.id,
      "dataSubTaskExam": newList
    }
    console.log("PAYLOAD-> " + JSON.stringify(payload))

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
    this.idSubTareaSeleccionada = id;
    console.log(`ID seleccionado: ${this.idSubTareaSeleccionada}`);
  }
}
