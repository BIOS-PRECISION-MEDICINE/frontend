import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERT_TYPE } from 'src/app/constants/alerts.constans';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { SubTaskExamService } from 'src/app/services/sub-task-exam.service';

declare var $: any;

@Component({
  selector: 'app-config-exec-subtask-exam',
  templateUrl: './config-exec-subtask-exam.component.html',
})
export class ConfigExecSubTaskExamComponent {
  public lst_config_subtask_exam: any = [];
  public id_subtask: number = -1;
  public order_subtask: number = -1;
  public name_task: string = '';
  public name_subtask: string = '';
  public lstExecSubTaskExam: any = [];
  public lstDatumSubTaskExam: any = [];

  constructor(
    private _router: Router,
    private _activatedroute: ActivatedRoute,
    private _params_service: ParametersService,
    private _subTask_exam_service: SubTaskExamService,
    private _alert: AlertPersonalService
  ) {
    this._router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.lst_config_subtask_exam = history.state;
    delete this.lst_config_subtask_exam.navigationId;
    this.lst_config_subtask_exam = Object.values(this.lst_config_subtask_exam);
    this.SetConfigDataSubTaskExam();
    this.getListingSubTaskExamByIds();
  }

  getListingSubTaskExamByIds(): void {
    $('.preloader').show();
    let lst_subtask_exam: any = this.lst_config_subtask_exam.map(
      (a: any) => a.id_subtask_exam
    );

    this._subTask_exam_service
      .getSubTaskExamByLstId(lst_subtask_exam.toString())
      .subscribe((resp) => {
        this.lstExecSubTaskExam = resp;
        this.SetParametersForNewExecSubTaskExam();
        console.log(this.lstExecSubTaskExam);
        $('.preloader').hide();
      });
  }

  restartProcess(id_exam: number, id_subtask: number) {
    if (id_subtask > 0 && id_exam > 0 && this.validateValueParameters()) {
      let desc: string = $(
        '#description_' + (this.lstExecSubTaskExam.length - 1)
      ).val();
      let params_form: any = this.createNewObjSubTareaExamen();
      if (params_form) {
        let test: any = {
          exam_id: id_exam,
          subtask_id: id_subtask,
          description: desc,
          dataSubTaskExam: params_form,
        };

        this._subTask_exam_service
          .createNewSubTaskExam(test)
          .subscribe((resp) => {
            if (resp.Meta.StatusCode == 200) {
              this._router.navigate([
                '/details-exam-process/' + test.exam_id,
                test.subtask_id,
              ]);
              this._alert.mostrarAlertTipoToast(
                ALERT_TYPE.OK,
                'Ejecución de examen creada exitosamente.'
              );
            } else {
              this._alert.mostrarAlertTipoToast(
                ALERT_TYPE.ERROR,
                resp.Meta.TipoRespuesta
              );
            }
            $('.preloader').hide();
            this.previousPage();
          });
      }
    } else {
      this._alert.mostrarAlertaSimplesPorTipo(
        ALERT_TYPE.ERROR,
        'El campo descripción es requerido.',
        'Error campos requeridos.'
      );
    }
  }

  previousPage(): void {
    this._router.navigate([
      '/details-exam-process/' + this.lstExecSubTaskExam[0].exam_id,
      this.lstExecSubTaskExam[0].subtask_id,
    ]);
  }

  SetConfigDataSubTaskExam(): void {
    if (this.lst_config_subtask_exam.length > 0) {
      this.id_subtask = this.lst_config_subtask_exam[0].subtask_id;
      this.order_subtask = this.lst_config_subtask_exam[0].order;
      this.name_task = this.lst_config_subtask_exam[0].name_task;
      this.name_subtask = this.lst_config_subtask_exam[0].name_subtask;
    }
  }

  // Checks if a new execution subtask has parameters set; otherwise, create the parameters
  SetParametersForNewExecSubTaskExam(): void {
    // Get config for exec sub_task_exam in lstExecSubTaskExam
    let idNewExec: number = this.lstExecSubTaskExam.findIndex((exec: any) => {
      return !exec.finished_at;
    });

    if (idNewExec === -1) {
      // Create a new instance of exam
      let newExec = {
        data_sub_task_exam: [],
        description: '',
        exam_id: this.lstExecSubTaskExam[0].exam_id,
        finished_at: null,
        previous_subtask_exam_id:
          this.lstExecSubTaskExam[0].previous_subtask_exam_id,
        sub_task: { name: this.lstExecSubTaskExam[0].sub_task.name },
        subtask_id: this.lstExecSubTaskExam[0].subtask_id,
      };
      this.lstExecSubTaskExam.push(newExec);
      idNewExec = this.lstExecSubTaskExam.length - 1;
      if (this.lstExecSubTaskExam[idNewExec]) {
        $('.preloader').show();
        // Get list of params by subtask
        this._params_service
          .getParameterByIdSubTask(this.id_subtask.toString())
          .subscribe((resp) => {
            // Filters the list to remove parameters that do not match the conditions.
            let lstParams: any = resp.filter(
              (e: any) =>
                e.type !== 'file' &&
                e.subtask_param.length > 0 &&
                e.subtask_param?.filter((p: any) => p.type === 'input')
            );
            // Iterate the list of parameters to get values and order.
            lstParams.forEach((param: any) => {
              if (param) {
                //param.order = iSubtask.sub_task.order;
                // Insert values of parameters associated to a subtask in list of executions
                this.lstExecSubTaskExam[idNewExec].data_sub_task_exam.push({
                  datum: {
                    value: param.subtask_param.find(
                      (v: any) => v.param_id == param.id
                    ).default_value,
                    param: param,
                  },
                });
              }
            });

            $('.preloader').hide();
          });
      }
    }
  }

  createNewObjSubTareaExamen(): void {
    let test: any = [];
    // Get config for exec sub_task_exam in lstExecSubTaskExam
    let idNewExec: number = this.lstExecSubTaskExam.findIndex((exec: any) => {
      return !exec.finished_at;
    });
    if (idNewExec > 0) {
      this.lstExecSubTaskExam[idNewExec].data_sub_task_exam.forEach(
        (item: any) => {
          let value: string = $(
            '#param_' +
              this.lstExecSubTaskExam[idNewExec].id +
              '_' +
              item.datum.param.id
          ).val();
          if (item.datum.param?.optional === '1' && !value) {
            value = item.datum.param.default_value;
          }

          test.push({
            param_id: item.datum.param.id,
            value: value,
          });
        }
      );
      return test;
    }
  }

  validateValueParameters(): boolean {
    let valid: boolean = true;
    // Ckeck required field description
    let desc: string = $(
      '#description_' + (this.lstExecSubTaskExam.length - 1)
    ).val();
    if (!desc) {
      return false;
    }

    // Get config for exec sub_task_exam in lstExecSubTaskExam
    let idNewExec: number = this.lstExecSubTaskExam.findIndex((exec: any) => {
      return !exec.finished_at;
    });
    // Get only the parameters in list of executions
    this.lstExecSubTaskExam[idNewExec].data_sub_task_exam.map(
      (dste: any) => dste.datum
    );

    this.lstExecSubTaskExam[idNewExec].data_sub_task_exam.forEach(
      (item: any) => {
        let input = $(
          '#param_' +
            this.lstExecSubTaskExam[idNewExec].id +
            '_' +
            item.datum.param.id
        );
        if (!input) {
          valid = false;
        }

        if (!input.val() && item.datum.param.optional == '0') {
          input.next().removeClass('d-none');
          valid = false;
        }
      }
    );

    return valid;
  }
}