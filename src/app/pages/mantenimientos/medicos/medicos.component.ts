import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs: any;
  public medicosUsu: any = [];
  public role: any = true;

  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService,
    private usuarioServices: UsuarioService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    if (this.usuarioServices.role === 'ADMIN_ROLE') {
      this.cargarMedicos();
    } else {
      this.cargarMedicosUsu();
    }

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe((img) => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;

      console.log(medicos);
    });
  }

  // get role():any{

  //   return this.usuarioServices.usuario?.role;

  // }

  cargarMedicosUsu() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;

      for (let index = 0; index < medicos.length; index++) {
        const _id = medicos[index].usuario._id;
        console.log(_id);
        if (_id === this.usuarioServices.uid) {
          // this.medicos = medicos[index];
          this.medicosUsu.push(medicos[index]);
          console.log(this.medicosUsu);
        }
      }

      this.role = false;

      console.log(this.medicosUsu);

      // if(medicos.usuario._id===this.medicos = medicos;){

      //   this.medicos = medicos;

      // }

      // console.log(medicos);
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }

    return this.busquedasService
      .buscar('medicos', termino)
      .subscribe((resultados) => {
        this.medicos = resultados as Medico[];
      });
  }

  borrarMedico(medico: Medico) {
    return Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,

      confirmButtonText: 'Sí, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos();

          Swal.fire(
            'Medico borrado',
            `${medico.nombre} fue eliminado corectamente`,
            'success'
          );
        });
      }
    });
  }
}
