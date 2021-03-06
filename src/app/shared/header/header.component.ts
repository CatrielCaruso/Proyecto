import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario:any;

  constructor(private usuarioService:UsuarioService,
              private router:Router) { 
    
    this.usuario=usuarioService.usuario;
    
  }


  logout(){

  this.usuarioService.logout();

  }

  buscar(termino:string){

    if(termino.length===0){
     
      return


    }
    
    // console.log(termino);
    this.router.navigateByUrl(`/home/buscar/${termino}`);
    
  }

}
