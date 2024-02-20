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
  public id_exam: number = -1;
  public id_patient: number = -1;
  public id_subtask: number = -1;
  public order_subtask: number = -1;
  public name_task: string = '';
  public name_subtask: string = '';
  public lst_prev_ids_ste: string[] = [];
  public lst_config_subtask_exam: any = [];
  public lst_subtask_exam_prev: any = [];
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
    let tempPrevConfig: any = history.state;
    this.id_exam = tempPrevConfig.id_exam;
    this.id_patient = tempPrevConfig.id_patient;
    this.id_subtask = tempPrevConfig.id_subtask;
    this.name_task = tempPrevConfig.task_name;
    this.name_subtask = tempPrevConfig.subtask_name;
    this.lst_prev_ids_ste = tempPrevConfig.prev_subtex_exam;
    this.lst_config_subtask_exam = tempPrevConfig.lst_config_subtask_exec;
    delete this.lst_config_subtask_exam.navigationId;
    this.lst_config_subtask_exam = Object.values(this.lst_config_subtask_exam);
    this.getListingPrevSubTaskExamById();
    this.getListingSubTaskExamByIds();
    this.addEventsTabsClick();
  }

  addEventsTabsClick(): void {
    $('.tab-container').on('click', '.tabs a', function (e: any) {
      e.preventDefault(),
        $(e.target)
          .parents('.tab-container')
          .find('.tab-content > div')
          .each(function (i: number, d: any) {
            $(d).hide();
          });
      let find = $(e.target)[0].tagName == 'div' ? 'a.active' : 'a';
      $(e.target).parents('.tabs').find(find).removeClass('active'),
        $(e.target).parents('a').toggleClass('active'),
        $(e.target).toggleClass('active'),
        $('#' + $(e.target).attr('src')).show();
      $('#' + $(e.target).parents('a').attr('src')).show();
    });
  }

  getListingSubTaskExamByIds(): void {
    $('.preloader').show();
    let lst_subtask_exam: any = this.lst_config_subtask_exam.map(
      (a: any) => a.id_subtask_exam
    );
    if (lst_subtask_exam) {
      this._subTask_exam_service
        .getSubTaskExamByLstId(lst_subtask_exam.toString())
        .subscribe((resp) => {
          this.lstExecSubTaskExam = resp;
          this.SetParametersForNewExecSubTaskExam();
          this.getPreviousSubTaskExamNameById();
          $('.preloader').hide();
        });
    }
  }

  getListingPrevSubTaskExamById(): void {
    $('.preloader').show();
    if (this.lst_prev_ids_ste) {
      this._subTask_exam_service
        .getSubTaskExamByLstId(this.lst_prev_ids_ste.toString())
        .subscribe((resp) => {
          this.lst_subtask_exam_prev = resp
            .filter((r: any) => {
              return r.finished_at;
            })
            .map((ste: any, index: number) => ({
              id: ste.id,
              name:
                'Exec N° ' + (index + 1) + ' sub-tarea: ' + ste.sub_task.name,
              description: ste.description,
            }));
          $('.preloader').hide();
        });
    }
  }

  getPreviousSubTaskExamNameById(): void {
    this.lstExecSubTaskExam.forEach((ste: any) => {
      let step: any = this.lst_subtask_exam_prev.find((step: any) => {
        return step.id == ste.previous_subtask_exam_id;
      });
      ste.subTaskExamPrevName = step?.name;
      ste.subTaskExamPrevDesc = step?.description;
    });
  }

  startProcess(id_exam: number, id_subtask: number) {
    if (id_subtask > 0 && id_exam > 0 && this.validateValueParameters()) {
      let desc: string = $(
        '#description_' + (this.lstExecSubTaskExam.length - 1)
      ).val();
      let prevSubTaskExam: string = $(
        '#id_subtask_prev_' + (this.lstExecSubTaskExam.length - 1)
      ).val();
      let params_form: any = this.createNewObjSubTareaExamen();

      if (params_form) {
        let test: any = {
          exam_id: id_exam,
          subtask_id: id_subtask,
          description: desc,
          dataSubTaskExam: params_form,
        };

        if (prevSubTaskExam) {
          test.previous_subtask_exam_id = prevSubTaskExam;
        }

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

  restartProcess(id_exam: number, id_subtask: number) {
    if (id_subtask > 0 && id_exam > 0 && this.validateValueParameters()) {
      let desc: string = $(
        '#description_' + (this.lstExecSubTaskExam.length - 1)
      ).val();
      let prevSubTaskExam: string = $(
        '#id_subtask_prev_' + (this.lstExecSubTaskExam.length - 1)
      ).val();
      let params_form: any = this.createNewObjSubTareaExamen();
      if (params_form) {
        let test: any = {
          exam_id: id_exam,
          subtask_id: id_subtask,
          description: desc,
          dataSubTaskExam: params_form,
        };

        if (prevSubTaskExam) {
          test.previous_subtask_exam_id = prevSubTaskExam;
        }

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
      this.id_patient,
    ]);
  }
  // Checks if a new execution subtask has parameters set; otherwise, create the parameters
  SetParametersForNewExecSubTaskExam(): void {
    if (this.lstExecSubTaskExam.length === 0) {
      // Get all parameters for a new specific subtask by id
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
          // Create a temporal subTaskExam for show view.
          let temp: any = this.createNewListOfSubTaskParams(lstParams);
          this.lstExecSubTaskExam.push(temp);
        });
    } else {
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
              let type_tag: string = 'string';
              lstParams.forEach((param: any) => {
                if (param) {
                  // Check if value is required and set value;
                  let value: any =
                    param.optional == 1
                      ? param.subtask_param.find(
                          (v: any) => v.param_id == param.id
                        ).default_value
                      : '';
                  // Check type of tag
                  switch (param.type) {
                    case 'integer':
                      type_tag = 'number';
                      break;
                    case 'time':
                      type_tag = 'date';
                      break;
                    default:
                      type_tag = 'string';
                  }
                  // Insert values of parameters associated to a subtask in list of executions
                  this.lstExecSubTaskExam[idNewExec].data_sub_task_exam.push({
                    datum: {
                      value: value,
                      param: param,
                      type_tag: type_tag,
                    },
                  });
                }
              });

              $('.preloader').hide();
            });
        }
      }
    }
  }

  createNewObjSubTareaExamen(): void {
    let test: any = [];
    // Get config for exec sub_task_exam in lstExecSubTaskExam
    let idNewExec: number = this.lstExecSubTaskExam.findIndex((exec: any) => {
      return !exec.finished_at;
    });
    if (idNewExec > -1) {
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
    // Check requeried field prevSubTaskExam for taskExam =1
    let prevSubTaskExam: string = $(
      '#id_subtask_prev_' + (this.lstExecSubTaskExam.length - 1)
    ).val();
    if (!prevSubTaskExam && this.lst_prev_ids_ste?.length > 0) {
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

  createNewListOfSubTaskParams(lstParams: any[]): any {
    let params: any = [];

    lstParams.forEach((item: any) => {
      let value: any =
        item.optional == 1 ? item.subtask_param[0].default_value : '';
      let type_tag: string = 'string';
      // Check type of tag
      switch (item.type) {
        case 'integer':
          type_tag = 'number';
          break;
        case 'time':
          type_tag = 'date';
          break;
        default:
          type_tag = 'string';
      }
      params.push({
        type: 'input',
        subtask_exam_id: null,
        datum_id: null,
        datum: {
          id: null,
          value: value,
          type_tag: type_tag,
          param_id: item.id,
          param: {
            id: item.id,
            name: item.name,
            type: item.type,
            optional: item.optional,
          },
        },
      });
    });

    return {
      previous_subtask_exam_id: null,
      exam_id: this.id_exam,
      subtask_id: this.id_subtask,
      finished_at: null,
      description: '',
      sub_task: {
        id: this.id_subtask,
        name: this.name_subtask,
        description: '',
        order: null,
        command: '',
      },
      data_sub_task_exam: params,
    };
  }

  changeSelectIdSubTaskExamPrev(event: any): void {
    let id_subTaskExamPrev = event.target.value;
    if (id_subTaskExamPrev) {
      let step: any = this.lst_subtask_exam_prev.find((step: any) => {
        return step.id == id_subTaskExamPrev;
      });
      $('#text_desc_subtask_exam_prev').val(step.description);
    }
  }
}
