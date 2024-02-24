import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

// Modules.
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
//import { PipesModule } from '../pipes/pipes.module';

// Components.
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ConfigUsuariosComponent } from './config-usuarios/config-usuarios.component';
import { ConfigRolesComponent } from './config-roles/config-roles.component';
import { ConfigPermisosComponent } from './config-permisos/config-permisos.component';
import { ConfigProcesosComponent } from './config-procesos/config-procesos.component';
import { ConfigTareasComponent } from './config-tareas/config-tareas.component';
import { ConfigSubTareasComponent } from './config-sub-tareas/config-sub-tareas.component';
import { ConfigParametersComponent } from './config-parameters/config-parameters.component';
import { ConfigPacientesComponent } from './config-pacientes/config-pacientes.component';
import { ConfigDatumComponent } from './config-datum/config-datum.component';
import { ConfigExamsComponent } from './config-exams/config-exams.component';
import { DetailsExamProcessComponent } from './details-exam-process/details-exam-process.component';
import { ConfigExecSubTaskExamComponent } from './config-exec-subtask-exam/config-exec-subtask-exam.component';
import { ConfigNewInstancePipelineComponent } from './config-new-instance-pipeline/config-new-instance-pipeline.component';
import { ExamsByPatientComponent } from './exams-by-patient/exams-by-patient.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ConfigUsuariosComponent,
    ConfigRolesComponent,
    ConfigPermisosComponent,
    ConfigProcesosComponent,
    ConfigTareasComponent,
    ConfigSubTareasComponent,
    ConfigParametersComponent,
    ConfigPacientesComponent,
    ConfigDatumComponent,
    ConfigExamsComponent,
    ExamsByPatientComponent,
    DetailsExamProcessComponent,
    ConfigExecSubTaskExamComponent,
    ConfigNewInstancePipelineComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    NgxPaginationModule,
  ]
})
export class PagesModule { }
