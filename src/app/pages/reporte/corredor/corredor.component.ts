import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-corredor',
  templateUrl: './corredor.component.html',
  
})
export class CorredorComponent implements OnInit {

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  constructor(private medicoService: MedicoService, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarMedicos();
  }

 

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;

      console.log(medicos);
    });
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

}
