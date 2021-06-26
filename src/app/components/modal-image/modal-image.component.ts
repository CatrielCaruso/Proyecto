import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imagenSubir:any;
  public imgTemp:any=null;

  constructor(public modalImagenService:ModalImagenService,
              public fileUploadSerevice:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    
    this.imgTemp=null;
    this.modalImagenService.cerrarModal();
    
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

    const id=this.modalImagenService.id;
    const tipo=this.modalImagenService.tipo;

    this.fileUploadSerevice
    .actualizarFoto(this.imagenSubir,tipo,id)
    .then((img:any)=>{
      
    Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success'),
    this.modalImagenService.nuevaImagen.emit(img);
    this.cerrarModal();
  
  
  }
    ).catch(
      err=>{
        console.log(err);
        Swal.fire('Error', 'No se pudo actualizar la imagen del usuario', 'error')} );
  }

}
