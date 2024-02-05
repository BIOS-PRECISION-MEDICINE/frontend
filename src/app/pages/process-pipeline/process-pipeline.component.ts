import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ProcessPipelineService } from 'src/app/services/process-pipeline.services';

declare var $: any;
@Component({
  selector: 'app-process-pipeline',
  templateUrl: './process-pipeline.component.html',
})
export class ProcessesPipelineComponent {
  @ViewChild('formContainer', { static: true })
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstProcessPipeline: any = [];
  
  constructor(
    private _router: Router,
    private _process_pipeline_service: ProcessPipelineService,
    private _alert: AlertPersonalService
  ) {
  }

  ngOnInit(): void {
    this.changePageTable(1);
  }

  changePageTable(page: number): void {
    $('.preloader').show();
    this.getListingProccesPipeline(page);
  }

  getListingProccesPipeline(page: number): any {
    $('.preloader').show();
    this._process_pipeline_service.getListingProcessPipeline(page).subscribe((resp) => {
      this.lstProcessPipeline = resp.data;
      $('.preloader').hide();
    });
  }

  sendToConfigProcessPipeline(): void{
    this._router.navigate(['/config-pipeline/']);
  }

  sendToDetailExamSubTasks(id:number): void{
    this._router.navigate(['/config-exam-sub-task/'+id]);
  }
  
}
