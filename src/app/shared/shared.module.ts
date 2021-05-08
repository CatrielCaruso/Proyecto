import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [DashboardComponent, BreadcrumbsComponent, SidebarComponent],
  exports: [DashboardComponent, BreadcrumbsComponent, SidebarComponent],
  imports: [CommonModule],
})
export class SharedModule {}
