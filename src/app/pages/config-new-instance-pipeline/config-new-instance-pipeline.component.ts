import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { Examen } from 'src/app/models/exam.model';
import { Parametro } from 'src/app/models/parametro.model';
import { SubTareaExamen } from 'src/app/models/subTareaExamen.nodel';
import { SubTarea } from 'src/app/models/subtarea.model';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';

declare var $: any;
@Component({
  selector: 'app-config-new-instance-pipeline',
  templateUrl: './config-new-instance-pipeline.component.html',
})
export class ConfigNewInstancePipelineComponent {
  public forms!: FormGroup;
  public task!: Tarea;
  public subTask!: SubTarea;
  public id_exam: number = -1;
  public id_patient: number = -1;
  public id_process: number = -1;
  public lstInputParams: any = [];
  public lstProcesses: any = [];
  
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _alert: AlertPersonalService,
    private _activatedroute: ActivatedRoute,
    private _exams_service: ExamsService,
    private _subtask_service: SubTasksService,
    private _processes_service: ProcessesService,
    private _subtask_exam_service: SubTaskExamService
  ) {
    this.task = new Tarea();
    this.subTask = new SubTarea();
    this.crearFormulario();
  }

  get processNoValido() {
    return (
      this.forms.get('id_process')?.invalid &&
      this.forms.get('id_process')?.touched
    );
  }

  get nameNoValido() {
    return this.forms.get('name')?.invalid && this.forms.get('name')?.touched;
  }

  get descNoValido() {
    return this.forms.get('description')?.invalid && this.forms.get('description')?.touched;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this._activatedroute.params.subscribe((params) => {
      this.id_patient = params['id_patient'];
      if (this.id_patient !== -1) {
        this.getListingAllProcess();
      }
    });
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id_process: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getListingAllProcess(): any {
    $('.preloader').show();
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      $('.preloader').hide();
    });
  }

  getConfigSubTask(): any {
    //URGENTE OJO
    $('.preloader').show();
    this._subtask_service
      .getListingSubTasksByFilters(this.id_process, 1, 1)
      .subscribe((resp) => {
        this.subTask = resp.length > 0 ? resp[0] : new SubTarea();
        this.task = this.subTask.task;
        this.lstInputParams = this.subTask.input_params.filter((obj) => {
          return obj.type != 'file';
        });

        this.lstInputParams.forEach((item: Parametro) => {
          switch (item.type) {
            case 'integer':
              item.type_tag = 'number';
              break;
            case 'time':
              item.type_tag = 'date';
              break;
            default:
              item.type_tag = 'string';
          }
        });
        $('.preloader').hide();
      });
  }

  sendToConfigParameters(): void {
    this._router.navigate(['/config-parametros/']);
  }

  sendToPreviusPage(): void {
    this._router.navigate(['/exams-by-patient/' + this.id_patient]);
  }

  changeSelectIdProcess(event: any): void {
    this.id_process = event.target.value;
    if (this.id_process) {
      this.getConfigSubTask();
      $('#main-panel').removeClass('d-none');
    }
  }

  newSubTaskExam(): void {
    $('.preloader').show();
    let id_subtask = $('#id_subtask_global').val();
    let description = $('#description').val();
    if (this.id_patient && id_subtask && this.validateValueParameters()) {
      //Create a new exam for the test
      let params_form = this.createObjSubTareaExamen();
      let name_examm: string = $('#name').val();

      if (this.id_process && this.id_patient && name_examm) {
        // Create a new exam for the test
        let exam: Examen = new Examen();
        exam.patient_id = this.id_patient.toString();
        exam.name = name_examm;
        const newList = this.lstInputParams.map((item: any) => ({
          param_id: item.id as number,
          value: item.default_value as string
        }));
        this._exams_service.createNewExam(exam).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.id_exam = resp.Data.id;
            let payload: SubTareaExamen = {
              "exam_id": this.id_exam,
              "subtask_id": this.subTask.id,
              "dataSubTaskExam": newList
            }
            console.log("INICIADO -->", JSON.stringify(payload))
            this._subtask_exam_service.createNewSubTaskExam(payload).subscribe(data => {
              this._alert.mostrarAlertTipoToast(
                ALERT_TYPE.OK,
                'Tarea 1, subproceso 1 iniciado'
              );
            })
          }

          // // Create new instance of test
          // if (this.id_exam > 0) {
          //   let test: any = {
          //     exam_id: this.id_exam,
          //     description: description,
          //     subtask_id: this.subTask.id,
          //     dataSubTaskExam: params_form,
          //   };

          //   this._subtask_exam_service
          //     .createNewSubTaskExam(test)
          //     .subscribe((resp) => {
          //       if (resp.Meta.StatusCode == 200) {
          //         this._alert.mostrarAlertTipoToast(
          //           ALERT_TYPE.OK,
          //           'Examen creado exitosamente.'
          //         );
          //       } else {
          //         this._alert.mostrarAlertTipoToast(
          //           ALERT_TYPE.ERROR,
          //           resp.Meta.TipoRespuesta
          //         );
          //       }
          //       $('.preloader').hide();
          //       this.sendToPreviusPage();
          //     });
          // } else {
          //   $('.preloader').hide();
          //   this._alert.mostrarAlertTipoToast(
          //     ALERT_TYPE.ERROR,
          //     'Ocurrio un error creando el nuevo examen. Por favor contacte con el administrador'
          //   );
          // }
        });
      }
    } else {
      $('.preloader').hide();
      this._alert.mostrarAlertaSimplesPorTipo(
        ALERT_TYPE.ERROR,
        'Por favor llene los campos obligatorios.',
        'Error: Campos requeridos'
      );
    }
  }

  validateValueParameters(): boolean {
    let valid: boolean = true;
    this.subTask.input_params
      .filter((obj) => {
        return obj.type != 'file';
      })
      .forEach((item: Parametro) => {
        let input = $('#param_' + item.id);
        if (!input) {
          valid = false;
        }

        if (!input.val() && item.optional == '0') {
          input.next().removeClass('d-none');
          valid = false;
        }
      });

    return valid;
  }

  createObjSubTareaExamen(): any {
    let test: any = [];
    this.lstInputParams.forEach((param: Parametro) => {
      let value: string = $('#param_' + param.id).val();
      if (param.optional === '1' && !value) {
        value = param.default_value;
      }

      test.push({
        param_id: param.id,
        value: value,
      });
    });
    return test;
  }
}
