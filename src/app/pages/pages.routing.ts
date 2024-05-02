import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//Guards
import { AuthGuard } from '../guards/auth.guard';
import { TokenGuard } from '../guards/token.guard';
//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigNewInstancePipelineComponent } from './config-new-instance-pipeline/config-new-instance-pipeline.component';
import { ExamsByPatientComponent } from './exams-by-patient/exams-by-patient.component';
import { ResultPipelineComponent } from './result-pipeline/result-pipeline.component';
import { HistoricoUsuarioComponent } from './historico-usuario/historico-usuario.component';
import { HistoricoPruebasComponent } from './historico-pruebas/historico-pruebas.component';
import { HistoricoUsuarioPruebasComponent } from './historico-usuario-pruebas/historico-usuario-pruebas.component';
import { ConfigUsuariosComponent } from './config-usuarios/config-usuarios.component';
import { ConfigRolesComponent } from './config-roles/config-roles.component';
import { ConfigPermisosComponent } from './config-permisos/config-permisos.component';

//Guards
import { PermissionGuard } from '../guards/permission.guard';
//Constants
import { ORIGEN_PERMISSIONS } from '../constants/origen-permissions.constants';
import { ConfigProcesosComponent } from './config-procesos/config-procesos.component';
import { ConfigTareasComponent } from './config-tareas/config-tareas.component';
import { ConfigSubTareasComponent } from './config-sub-tareas/config-sub-tareas.component';
import { ConfigParametersComponent } from './config-parameters/config-parameters.component';
import { ConfigPacientesComponent } from './config-pacientes/config-pacientes.component';
import { ConfigDatumComponent } from './config-datum/config-datum.component';
import { ConfigExamsComponent } from './config-exams/config-exams.component';
import { DetailsExamProcessComponent } from './details-exam-process/details-exam-process.component';
import { ConfigExecSubTaskExamComponent } from './config-exec-subtask-exam/config-exec-subtask-exam.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ AuthGuard, TokenGuard ],
    children: [
            { path: 'dashboard', canActivate:[TokenGuard, AuthGuard], component: DashboardComponent, data: { titulo: 'Home' } },
            {path:'config-usuarios',canActivate:[ PermissionGuard,TokenGuard], component: ConfigUsuariosComponent, data: { titulo: 'Configuración usuarios', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-roles',canActivate:[ PermissionGuard,TokenGuard], component: ConfigRolesComponent, data: { titulo: 'Configuración roles', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-permisos',canActivate:[ PermissionGuard,TokenGuard], component: ConfigPermisosComponent, data: { titulo: 'Configuración permisos', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-new-instance-pipeline/:id_patient',canActivate:[ PermissionGuard,TokenGuard], component: ConfigNewInstancePipelineComponent, data: { titulo: 'Configuración pipeline', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'exams-by-patient/:id_patient',canActivate:[ PermissionGuard,TokenGuard], component: ExamsByPatientComponent, data: { titulo: 'Examenes por paciente', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'result-pipeline',canActivate:[ PermissionGuard,TokenGuard], component: ResultPipelineComponent, data: { titulo: 'Configuración resultados', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'historico-usuario',canActivate:[ PermissionGuard,TokenGuard], component: HistoricoUsuarioComponent, data: { titulo: 'Histórico usuario', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'historico-pruebas',canActivate:[ PermissionGuard,TokenGuard], component: HistoricoPruebasComponent, data: { titulo: 'Histórico pruebas', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'historico-usuario-pruebas',canActivate:[ PermissionGuard,TokenGuard], component: HistoricoUsuarioPruebasComponent, data: { titulo: 'Histórico pruebas a usuario', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-procesos',canActivate:[ PermissionGuard,TokenGuard], component: ConfigProcesosComponent, data: { titulo: 'Procesos', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-tareas',canActivate:[ PermissionGuard,TokenGuard], component: ConfigTareasComponent, data: { titulo: 'Tareas', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-sub-tareas',canActivate:[ PermissionGuard,TokenGuard], component: ConfigSubTareasComponent, data: { titulo: 'Subtareas', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-parametros',canActivate:[ PermissionGuard,TokenGuard], component: ConfigParametersComponent, data: { titulo: 'Parameters', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-pacientes',canActivate:[ PermissionGuard,TokenGuard], component: ConfigPacientesComponent, data: { titulo: 'Pacientes', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-datum',canActivate:[ PermissionGuard,TokenGuard], component: ConfigDatumComponent, data: { titulo: 'Data', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-exams',canActivate:[ PermissionGuard,TokenGuard], component: ConfigExamsComponent, data: { titulo: 'Examenes', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'details-exam-process/:id_exam/:id_process/:id_patient',canActivate:[ PermissionGuard,TokenGuard], component: DetailsExamProcessComponent, data: { titulo: 'Examen Tareas', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            {path:'config-exec-subtask-exam',canActivate:[ PermissionGuard,TokenGuard], component: ConfigExecSubTaskExamComponent, data: { titulo: 'Configuración ejecución de examen', permiso: ORIGEN_PERMISSIONS.ACCESS_MODULE_ORIGEN }},
            ]
}
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
