import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


declare function customInitFunction():void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
 
  constructor(private settingsService:SettingsService,
              private sidebarServices:SidebarService) { }

  ngOnInit( ): void {

    customInitFunction(),
    this.sidebarServices.cargarMenu();
   

   
   



  }

  
}


