import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {
   
 
  
  constructor(private settingsServices:SettingsService) { }

  ngOnInit(): void {
   
    this.settingsServices.checkCurrentTheme();}
  
    changeTheme(theme:string){
     
     
     this.settingsServices.changeTheme(theme);
     
    
    };

    
}
