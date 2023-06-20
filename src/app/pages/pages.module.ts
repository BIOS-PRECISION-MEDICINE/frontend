import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules.
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
//import { PipesModule } from '../pipes/pipes.module';

// Components.
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { HistoricoUsuarioComponent } from './historico-usuario/historico-usuario.component';
import { HistoricoPruebasComponent } from './historico-pruebas/historico-pruebas.component';
import { HistoricoUsuarioPruebasComponent } from './historico-usuario-pruebas/historico-usuario-pruebas.component';
import { ConfigUsuariosComponent } from './config-usuarios/config-usuarios.component';
import { ConfigRolesComponent } from './config-roles/config-roles.component';
import { ConfigPermisosComponent } from './config-permisos/config-permisos.component';
import { IgvComponent } from './igv/igv.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    HistoricoUsuarioComponent,
    HistoricoPruebasComponent,
    HistoricoUsuarioPruebasComponent,
    ConfigUsuariosComponent,
    ConfigRolesComponent,
    ConfigPermisosComponent,
    IgvComponent,
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
  ]
})
export class PagesModule { }
