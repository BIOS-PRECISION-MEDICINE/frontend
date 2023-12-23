import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ParametersService } from 'src/app/services/parameters.service';

declare var $: any;

@Component({
  selector: 'app-config-exam-subtask-process',
  templateUrl: './config-exam-subtask-process.component.html',
  styleUrls: ['./config-exam-subtask-process.component.css']
})
export class ConfigExamSubtaskProcessComponent {
  public forms!: FormGroup;
  public current_exam_subtask: number = -1;
  public lstParameters: any = [];

  constructor(
    private fb: FormBuilder,
    private _activatedroute:ActivatedRoute,
    private _parameters_service: ParametersService,
    private _alert: AlertPersonalService
  ) {
  }

  ngOnInit(): void {
    this.getParametersByTask(1);
    this._activatedroute.params.subscribe(params => { 
      this.current_exam_subtask = params['id_exam_subtask']; 
  });
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      description: [],
    });
  }

  getParametersByTask(page: number): void {
    $('.preloader').show();
    this._parameters_service.getListingParameters(page).subscribe((resp) => {
      this.lstParameters = resp.data;
      console.log(this.lstParameters);
      $('.preloader').hide();
    });
  }

  generateParametersPanel():void{

  }

  changeTabPanelTask(page: number): void {
    alert();
  }

  startProcess(task: number):void{
    $('.card').addClass("loading-process-subtask");
    
  }

  restartProcess(task: number):void{
    
  }

  nextProcess(c_task: number):void{
    
  }

}
