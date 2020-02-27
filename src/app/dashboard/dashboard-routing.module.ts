import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BlankComponent } from './components/blank/blank.component';


import { 
  GuardService as Guard 
} from '../services/guard.service';
import { 
  RoleGuardService as RoleGuard 
} from '../services/role-guard.service';

const routes: Routes = [
  {
    path: '', 
    component: BlankComponent,
    canActivate: [Guard],  
  },
  {
    path: 'adm/:id', 
    component: AdministracionComponent,
    canActivate: [Guard],
    data: {role: 'Admin'}
  },
  {
    path: 'perfil/:id', 
    component: PerfilComponent,
    canActivate: [Guard],
  },
  {
    path: 'agenda/:id', 
    component: DirectorioComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Empleado'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

  constructor(
  ) {

	}

 }
