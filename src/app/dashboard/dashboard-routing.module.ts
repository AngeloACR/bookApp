import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { BlankComponent } from './components/blank/blank.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { HistorialComponent } from './components/historial/historial.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { PromosComponent } from './components/promos/promos.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { ClientesComponent } from './components/clientes/clientes.component';


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
    data: { role: 'Admin' }
  },
  {
    path: 'notificaciones/:id',
    component: NotificacionesComponent,
    canActivate: [Guard],
  },
  {
    path: 'historial/:id',
    component: HistorialComponent,
    canActivate: [Guard],
  },
  {
    path: 'empresa/:id',
    component: EmpresaComponent,
    canActivate: [Guard],
  },
  {
    path: 'estadisticas/:id',
    component: EstadisticasComponent,
    canActivate: [Guard],
  },
  {
    path: 'promo/:id',
    component: PromosComponent,
    canActivate: [Guard],
  },
  {
    path: 'terminos/:id',
    component: TerminosComponent,
    canActivate: [Guard],
  },
  {
    path: 'pagos/:id',
    component: PagosComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Empleado',
      role3: 'Empresa',
    }
  },
  {
    path: 'soporte/:id',
    component: SoporteComponent,
    canActivate: [Guard],
  },
  {
    path: 'clientes/:id',
    component: ClientesComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
    }
  },
  {
    path: 'agenda/:id',
    component: DirectorioComponent,
    canActivate: [Guard],
    data: {
      role1: 'Admin',
      role2: 'Empleado',
      role3: 'Empresa',
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
