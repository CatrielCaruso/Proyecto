import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { CorredorComponent } from './reporte/corredor/corredor.component';
import { CarrerasComponent } from './reporte/carreras/carreras.component';


const childRoutes:Routes=[



  { path: '', component: DashboardComponent,data:{titulo:'home'} },
  { path: 'account-settings', component: AccountSettingComponent,data:{titulo:'Ajuste de cuentas'} },
  { path: 'buscar/:termino', component: BusquedaComponent,data:{titulo:'Busquedas'} },
  { path: 'grafica1', component: Grafica1Component, data:{titulo:'Grafícas #1'}},
  { path: 'progress', component: ProgressComponent,data:{titulo:'ProgressBar'} },
  { path: 'promesas', component: PromesasComponent,data:{titulo:'Promesas'} },
  { path: 'perfil', component: PerfilComponent,data:{titulo:'Perfil de usuario'} },
  { path: 'rxjs', component: RxjsComponent,data:{titulo:'RXJS'} },

  // Mantenimientos 
  
 
  { path: 'corredores', component: MedicosComponent,data:{titulo:'Mantenimiento de Corredores'} },
  { path: 'corredor/:id', component: MedicoComponent,data:{titulo:'Mantenimiento de Corredor'} },

  // Reporte

  { path: 'CorredoresDetalles',canActivate:[AdminGuard], component: CorredorComponent,data:{titulo:'Detalles de corredores'} },
  { path: 'CarrerasDetalles',canActivate:[AdminGuard], component: CarrerasComponent,data:{titulo:'Detalles de las carreras'} },

  
  // Rutas de admin
  { path: 'usuarios',canActivate:[AdminGuard] ,component: UsuariosComponent,data:{titulo:'Mantenimiento de Usuarios'} },
  { path: 'carreras',canActivate:[AdminGuard], component: HospitalesComponent,data:{titulo:'Mantenimiento de Carreras'} },
]

@NgModule({
  
  
    imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  
})
export class ChildRoutersModule { }
