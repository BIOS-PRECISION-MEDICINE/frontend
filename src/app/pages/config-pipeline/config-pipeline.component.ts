import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Datum } from 'src/app/models/datum.model';
import { SubTarea } from 'src/app/models/subtarea.model';
import { SubTareaParametro } from 'src/app/models/subtareaParametro.model';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { DatumService } from 'src/app/services/datum.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { ProcessPipelineService } from 'src/app/services/process-pipeline.services';
import { ProcessesService } from 'src/app/services/processes.service';

declare var $: any;
@Component({
  selector: 'app-config-pipeline',
  templateUrl: './config-pipeline.component.html',
})
export class ConfigPipelineComponent {
  @ViewChild('formContainer', { static: true })
  public formContainer: any;
  public forms!: FormGroup;
  public lstExams: any = [];
  public lstProcesses: any = [];
  public lstParametres: any = [];
  public lstTasksParams: any = [];

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _datum_service: DatumService,
    private _processes_service: ProcessesService,
    private _parameters_service: ParametersService,
    private _process_pipeline_service: ProcessPipelineService,
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
    this.getListingAllProcces();
    this.getListingAllParameters();
  }

  crearFormulario() {
    this.forms = this.fb.group({
      id_process: ['', Validators.required],
      id_exam: ['', Validators.required],
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

  getListingAllParameters(): any {
    $('.preloader').show();
    this._parameters_service.getAllListingParameters().subscribe((resp) => {
      this.lstParametres = resp.data;
      $('.preloader').hide();
    });
  }

  getListingTasksParams(id_exam: string): any {
    $('.preloader').show();
    this._process_pipeline_service
      .getListingParamsByIdExam(id_exam)
      .subscribe((resp) => {
        this.lstTasksParams = resp;
        //pintar el formulario
        $('.preloader').hide();
        console.log(this.lstTasksParams);
      });
  }

  sendToConfigExam(): void {
    this._router.navigate(['/config-exams/']);
  }

  sendToConfigParameters():void{
    this._router.navigate(['/config-parametros/']);
  }

  sendToPreviusPage():void{
    this._router.navigate(['/process-pipeline/']);
  }

  changeSelectProcess(event: any) {
    $('.preloader').show();
    this._process_pipeline_service
      .getListingExamsByIdProcess(event.target.value)
      .subscribe((resp) => {
        this.lstExams = resp;
        $('.preloader').hide();
      });

    this.forms.get('id_exam')?.setValue('', {
      onlySelf: true,
    });
  }

  changeSelectExam(event: any): void {
    this.getListingTasksParams(event.target.value);
  }

  async changeInputValue(event: any) {
    if (
      event.type === 'blur' ||
      (event.type === 'keydown' && event.key === 'Enter')
    ) {
      let data: Datum;
      let id_param = event.target.id.split('_')[1];
      let id_datum = $('#' + event.target.id)[0].datum_id;
      let valor = $('#' + event.target.id).val();
      if (id_param && id_datum && valor) {
        $('#' + event.target.id).prop('disabled', true);
        data = { id: id_datum, param_id: id_param, value: valor };
        const result = await this.updateParamValueById(data);
        $('#' + event.target.id).prop('disabled', false);
        if (result === 'OK') {
          $('#' + event.target.id)
            .next()
            .removeClass('d-none');
        } else {
          $('#' + event.target.id)
            .next()
            .next()
            .removeClass('d-none');
        }
      }
    }
  }

  updateParamValueById(data: Datum): any {
    return new Promise((resolve) => {
      this._datum_service.updateDatum(data).subscribe((resp) => {
        if (resp.Meta.StatusCode == 200) {
          resolve('OK');
        } else {
          resolve('KO');
        }
      });
    });
  }

  async changeInputDefault(event: any) {
    if (
      event.type === 'blur' ||
      (event.type === 'keydown' && event.key === 'Enter')
    ) {
      let data: SubTareaParametro;
      let id_subtask_param = event.target.id.split('_')[1];
      let id_param = $('#' + event.target.id)[0].param_id;
      let id_subtask = $('#' + event.target.id)[0].subtask_id;
      let type_subtask_param = $('#' + event.target.id)[0].type_subtask_param;
      let valor = $('#' + event.target.id).val();
      if (
        id_subtask_param &&
        id_param &&
        id_subtask &&
        type_subtask_param &&
        valor
      ) {
        $('#' + event.target.id).prop('disabled', true);
        data = {
          id: id_subtask_param,
          type: type_subtask_param,
          subtask_id: id_subtask,
          param_id: id_param,
          default_value: valor,
        };
        const result = await this.updateParamDefaultById(data);
        $('#' + event.target.id).prop('disabled', false);
        if (result === 'OK') {
          $('#' + event.target.id)
            .next()
            .removeClass('d-none');
        } else {
          $('#' + event.target.id)
            .next()
            .next()
            .removeClass('d-none');
        }
      }
    }
  }

  updateParamDefaultById(data: SubTareaParametro): any {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('OK');
      }, 2000);
    });
  }

  addNewParamToSubtask(): void {
    let id_param = $('#select_params').val();
    if(id_param){
    let param = this.lstParametres.find((obj: any) => {
      return obj.id == id_param;
    });
    if(!param){

    }
  }
    alert('esta pendiente de que Felipe haga el crud de subtask-param');
  }

  newSubTaskExam(): void {
    let id_exam = $('#id_exam').val();
    let id_subtask = $('#id_subtask_global').val();
    if(id_exam && id_subtask)
    {

    }
    alert('esta pendiente de que Felipe haga el crud de subtask-param');
  }
}
