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


const childRoutes:Routes=[



  { path: '', component: DashboardComponent,data:{titulo:'Dashboard'} },
  { path: 'account-settings', component: AccountSettingComponent,data:{titulo:'Ajuste de cuentas'} },
  { path: 'buscar/:termino', component: BusquedaComponent,data:{titulo:'Busquedas'} },
  { path: 'grafica1', component: Grafica1Component, data:{titulo:'Grafícas #1'}},
  { path: 'progress', component: ProgressComponent,data:{titulo:'ProgressBar'} },
  { path: 'promesas', component: PromesasComponent,data:{titulo:'Promesas'} },
  { path: 'perfil', component: PerfilComponent,data:{titulo:'Perfil de usuario'} },
  { path: 'rxjs', component: RxjsComponent,data:{titulo:'RXJS'} },

  // Mantenimientos
  
 
  { path: 'medicos', component: MedicosComponent,data:{titulo:'Mantenimiento de Medicos'} },
  { path: 'medico/:id', component: MedicoComponent,data:{titulo:'Mantenimiento de Medico'} },
  
  // Rutas de admin
  { path: 'usuarios',canActivate:[AdminGuard] ,component: UsuariosComponent,data:{titulo:'Mantenimiento de Usuarios'} },
  { path: 'hospitales',canActivate:[AdminGuard], component: HospitalesComponent,data:{titulo:'Mantenimiento de Hospitales'} },
]

@NgModule({
  
  
    imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  
})
export class ChildRoutersModule { }
