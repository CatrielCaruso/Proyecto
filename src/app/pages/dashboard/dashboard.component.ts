import { Component, OnInit } from '@angular/core';
// import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
// import { ModalImagenService } from 'src/app/services/modal-imagen.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
   

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: any;
  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospital();
    // this.imgSubs = this.modalImagenService.nuevaImagen
    //   .pipe(delay(200))
    //   .subscribe((img) => this.cargarHospital());
  }


  cargarHospital() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  // abrirModal(hospital: Hospital) {
  //   this.modalImagenService.abrirModal(
  //     'hospitales',
  //     hospital._id,
  //     hospital.img
  //   );
  // }

}
