import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  
})
export class CarrerasComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public medicos: Medico[] = [];

  constructor(private hospitalService: HospitalService,private busquedasService: BusquedasService,private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarHospital();
    this.cargarMedicos();
  }

  cargarHospital() {
    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  // buscar(termino: string) {
  //   if (termino.length === 0) {
  //     return this.cargarHospital();
  //   }

  //   return this.busquedasService
  //     .buscar('hospitales', termino)
  //     .subscribe((resultados) => (this.hospitales = resultados as Hospital[]));
  // }


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

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;

      console.log(medicos);
    });
  }

}
