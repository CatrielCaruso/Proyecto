import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: any;
  public usuario: any;
  public imagenSubir:any;
  public imgTemp:any=null;
 

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadSerevice:FileUploadService
               ) {
    
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm?.value )
        .subscribe( () => {
          const { nombre, email } = this.perfilForm?.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }


  cambiarImagen(file:any){

    // if(event?.target?.files[0]){
 
    //   this.imagenSubir = file;}

    this.imagenSubir=file.files[0]

    if(!file.files[0]){
      this.imgTemp=null
      return ;
    }

     const reader= new FileReader();
     const url64=reader.readAsDataURL(file.files[0]);

   
    

    reader.onloadend=()=>{
      
       this.imgTemp=reader.result;
       console.log(reader.result);

    }

    // return console.log(reader.result);
  }

  subirImagen(){

    this.fileUploadSerevice
    .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
    .then((img:any)=>{this.usuario.img=img;
    Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success')}
    ).catch(
      err=>{
        console.log(err);
        Swal.fire('Error', 'No se pudo actualizar la imagen del usuario', 'error')} );
  }

 

}
