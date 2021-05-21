import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import{FormsModule} from '@angular/forms';



//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { HeaderComponent } from '../shared/header/header.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingComponent,
  ],
  exports: [
    HeaderComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule,FormsModule,ComponentsModule],
})
export class PagesModule {}
