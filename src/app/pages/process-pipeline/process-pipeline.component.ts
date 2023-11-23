import { Component } from '@angular/core';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ParametersService } from 'src/app/services/parameters.service';

declare var $: any;
@Component({
  selector: 'app-process-pipeline',
  templateUrl: './process-pipeline.component.html',
  styleUrls: ['./process-pipeline.component.css']
})
export class ProcessPipelineComponent {
  public current_task: number = 1;
  public lstParameters: any = [];

  constructor(
    private _parameters_service: ParametersService,
    private _alert: AlertPersonalService
  ) {
  
  }

  ngOnInit(): void {
    this.getParametersByTask(1);
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

  }

  restartProcess(task: number):void{
    
  }

  nextProcess(c_task: number):void{
    
  }

}
