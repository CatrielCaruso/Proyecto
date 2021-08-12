import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: 'home',
    component: PagesComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    loadChildren:()=>import('./child-routers.module').then(m=>m.ChildRoutersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
