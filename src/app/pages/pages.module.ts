import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';



//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { HeaderComponent } from '../shared/header/header.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CorredorComponent } from './reporte/corredor/corredor.component';
import { CarrerasComponent } from './reporte/carreras/carreras.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
    BusquedaComponent,
    CorredorComponent,
    CarrerasComponent
  ],
  exports: [
    HeaderComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,

  ],
  imports: [CommonModule, SharedModule, RouterModule,FormsModule,ReactiveFormsModule,ComponentsModule,PipesModule],
})
export class PagesModule {}
