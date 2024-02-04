import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { CustomField } from 'src/app/models/customFields.model';
import { Examen } from 'src/app/models/exam.model';
import { SubTarea } from 'src/app/models/subtarea.model';
import { Tarea } from 'src/app/models/tarea.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ExamsService } from 'src/app/services/exam.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { SubTasksService } from 'src/app/services/sub-tasks.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-process-pipeline',
  templateUrl: './process-pipeline.component.html',
})
export class ProcessesPipelineComponent {
  @ViewChild('formContainer', { static: true })
  public formContainer: any;
  public forms!: FormGroup;
  public first_task!: Tarea;
  public first_subtask!: SubTarea;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstExams: any = [];
  public lstExamByProcess: any = [];
  public lstProcesses: any = [];
  public lstPatients: any = [];

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _exams_service: ExamsService,
    private _processes_service: ProcessesService,
    private _tasks_service: TasksService,
    private _subtasks_service: SubTasksService,
    private _patients_service: PatientService,
    private _alert: AlertPersonalService
  ) {
    this.crearFormulario();
  }

  get processNoValido() {
    return (
      this.forms.get('id_process')?.invalid &&
      this.forms.get('id_process')?.touched
    );
  }

  get examNoValido() {
    return (
      this.forms.get('id_exam')?.invalid && this.forms.get('id_exam')?.touched
    );
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id_process: ['', Validators.required],
      id_exam: ['', Validators.required],
    });
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this.getListingAllExams();
    this.getFirstTask();
  }

  modalClose(): void {
    this.forms.reset();
    $('#ProcessPipelineNew').modal('hide');
  }

  modalAddProcessPipeline() {
    let nfield: CustomField = {
      id: 'id_campo',
      type: 'textarea',
      required: true,
      placeholder: 'Nombre del campo',
      classes: ['form-control'],
      rows: '3',
      list: [],
    };
    let nfield2: CustomField = {
      id: 'id_campo1',
      type: 'select',
      required: true,
      placeholder: 'Seleccione rol',
      classes: ['form-control'],
      rows: '',
      list: [
        { id: '-1', value: '--Seleccione  opción --' },
        { id: '1', value: 'option_1' },
        { id: '2', value: 'option_2' },
      ],
    };
    let x1 = this.createDivElement('12', ['input-group', 'mb-2']);
    let x2 = this.createFieldlElement(nfield);
    let x3 = this.createFieldlElement(nfield2);
    x1.appendChild(x2);
    x1.appendChild(x3);
    this.formContainer.nativeElement.appendChild(x1);
    //------
    this.forms.reset();
    this.getListingAllProcces();
    this.forms.get('id_exam')?.setValue('', {
      onlySelf: true,
    });
    $('#ProcessPipelineNew').modal({ backdrop: 'static', keyboard: false });
  }

  getFirstTask(): any {
    $('.preloader').show();
    this._tasks_service.getAllListingTasks().subscribe((resp) => {
      this.first_task = resp.data.find((obj: any) => {
        if (obj.order === 1) {
          this.getFirstSubTask(obj.id);
          return true;
        } else {
          return false;
        }
      });
      $('.preloader').hide();
    });
  }

  getFirstSubTask(id_task: string): any {
    $('.preloader').show();
    this._subtasks_service.getAllListingSubTasks().subscribe((resp) => {
      this.first_subtask = resp.data.find((obj: any) => {
        return obj.task_id === this.first_task.id && obj.order === 1;
      });
      $('.preloader').hide();
    });
  }

  getListingAllProcces(): any {
    $('.preloader').show();
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.forms.controls['id_process'].setValue('', { onlySelf: true });
      $('.preloader').hide();
    });
  }

  getListingAllExams(): any {
    $('.preloader').show();
    this._exams_service.getAllListingExams().subscribe((resp_exams) => {
      this.lstExams = resp_exams.data;
      // get patients for each exam for show in dropdown (Examen)
      this._patients_service
        .getAllListingPatients()
        .subscribe((resp_patients) => {
          this.lstPatients = resp_patients.data;
          // Sets patients name of exam for each Exam in list
          this.lstExams.forEach((item: any) => {
            item.patient = this.lstPatients.find((obj: any) => {
              return obj.id === item.patient_id;
            });
          });
          $('.preloader').hide();
        });
      // get current task for show in listing of exam  
      

    });
  }

  getListingParamsBySubTask(): any {
    $('.preloader').show();
    this._processes_service.getAllListingProcesses().subscribe((resp) => {
      this.lstProcesses = resp.data;
      this.forms.controls['id_process'].setValue('', { onlySelf: true });
      $('.preloader').hide();
    });
  }

  newProcessPipeline() {}

  sendToDetailExamSubTasks(id_exam_subtask: string): void {
    this._router.navigate(['/config-exam-sub-task/' + id_exam_subtask]);
  }

  removeExam(id_task: string): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: `¿Desea eliminar la examen con id N° ${id_task} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      $('.preloader').show();
      if (result.isConfirmed) {
        this._exams_service.deleteExam(id_task).subscribe((resp) => {
          if (resp.Meta.StatusCode == 200) {
            this.changePageTable(1);
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.OK,
              'Examen eliminado exitosamente.'
            );
          } else {
            this._alert.mostrarAlertTipoToast(
              ALERT_TYPE.ERROR,
              resp.Meta.TipoRespuesta
            );
          }
        });
      }
      $('.preloader').hide();
    });
  }

  changeSelectProcess(event: any) {
    this.lstExamByProcess = this.lstExams.filter(
      (item: any) => item.process_id == event.target.value
    );
    this.forms.get('id_exam')?.setValue('', {
      onlySelf: true,
    });
  }

  // creates a new div element from config parameters
  createDivElement(id: string, classes: string[]): HTMLElement {
    let div: HTMLElement = document.createElement('div');
    if (id) {
      div.setAttribute('id', id);
    }

    if (classes) {
      classes.forEach((item: any) => {
        div.classList.add(item);
      });
    }

    return div;
  }

  // creates a new field element from config parameters
  createFieldlElement(properties: CustomField): any {
    let field!: any;
    switch (properties.type) {
      case 'input':
        field = document.createElement('input');
        field.setAttribute('type', properties.type);
        break;
      case 'textarea':
        field = document.createElement('textarea');

        if (properties.rows) {
          field.setAttribute('rows', properties.rows);
        }
        break;
      case 'select':
        field = document.createElement('select');

        properties.list.forEach((item: any) => {
          let option = document.createElement('option');
          option.setAttribute('value', item.id);

          let optionText = document.createTextNode(item.value);
          option.appendChild(optionText);
          field.appendChild(option);
        });
        break;
      default:
        console.log(`Sorry, we are out of ${properties.type}.`);
    }

    if (properties.classes) {
      properties.classes.forEach((item: any) => {
        field.classList.add(item);
      });
    }

    if (properties.id) {
      field.setAttribute('id', properties.id);
      field.setAttribute('formControlName', properties.id);
    }

    if (properties.required) {
      field.setAttribute('required', '');
    }

    if (properties.placeholder) {
      field.setAttribute('placeholder', properties.placeholder);
    }
    return field;
  }

  // create a new form from config parameters
  createFormElementSubTask() {

  }
}
