import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

@Component({
  selector: 'app-config-datum-sub-task-exam',
  templateUrl: './config-datum-sub-task-exam.component.html',
  styleUrls: []
})
export class ConfigDatumSubTaskExamComponent {

  public isOK: boolean= true;
  public edit_state: boolean = false;
  public forms!: FormGroup;
  public current_page: number = 1;
  public per_page: number = 10;
  public total_items: number = 0;
  public lstProcesses: any = [];

  constructor(
    private fb: FormBuilder,
    private _alert: AlertPersonalService
  ) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forms = this.fb.group({
      name: ['', Validators.required],
      description: [],
    });
  }

}
