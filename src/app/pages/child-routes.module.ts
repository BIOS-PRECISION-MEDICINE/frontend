import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components.
import { DashboardComponent } from './dashboard/dashboard.component';

// Guards.
import { TokenGuard } from '../guards/token.guard';
import { AuthGuard } from '../guards/auth.guard';

// Modules.
import { ComponentsModule } from '../components/components.module';

const childRoutes: Routes = [
  { path: '', canActivate:[TokenGuard, AuthGuard], component: DashboardComponent, data: { titulo: 'Home' } },
]

@NgModule({
  imports: [
    ComponentsModule,
    RouterModule.forChild(childRoutes)
   ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
