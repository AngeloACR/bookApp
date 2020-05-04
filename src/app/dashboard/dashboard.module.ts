import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
registerLocaleData(localeCO, 'es-CO');

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
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


@NgModule({
  declarations: [
    DashboardComponent,
    AdministracionComponent,
    DirectorioComponent,
    HeaderComponent,
    SidemenuComponent,
    PerfilComponent,
    BlankComponent,
    NotificacionesComponent,
    HistorialComponent,
    EmpresaComponent,
    EstadisticasComponent,
    PromosComponent,
    TerminosComponent,
    PagosComponent,
    SoporteComponent,
    ClientesComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
})
export class DashboardModule { }
