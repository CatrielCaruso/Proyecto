import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [DashboardComponent, BreadcrumbsComponent, SidebarComponent],
  exports: [DashboardComponent, BreadcrumbsComponent, SidebarComponent],
  imports: [CommonModule,RouterModule,FormsModule,PipesModule],
})
export class SharedModule {}
