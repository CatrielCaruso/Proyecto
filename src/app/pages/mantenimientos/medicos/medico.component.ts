import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: any;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
      covid: [false],
      dni: ['',Validators.required],
    });
    this.cargarHospitales();

    this.medicoForm
      .get('hospital')
      .valueChanges.subscribe((hospitalId: any) => {
        // console.log(hospitalId);

        this.hospitalSeleccionado = this.hospitales.find(
          (h) => h._id === hospitalId
        );
        // console.log(this.hospitalSeleccionado);
      });
  }

  cargarMedico(id: string) {

    if(id==='nuevo'){

     return;

    }



    this.medicoService.obtenerMedicoPorId(id).pipe(

      delay(100)
    )
    
    .subscribe((medico) => {

      if(!medico){

       return this.router.navigateByUrl(`/dashboard/medicos`);

      }

      const {
        dni,
        covid,
        nombre,
        hospital: { _id },
        
      } = medico;

      
      this.medicoForm.setValue({dni, covid,nombre, hospital: _id });
      return this.medicoSeleccionado = medico;
    });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      //Actualizar

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id,
      };

      this.medicoService.actualizarMedico(data).subscribe((resp) => {
        Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
      });
    } else {
      //Crear

      this.medicoService
        .crearMedicos(this.medicoForm.value)
        .subscribe((resp: any) => {
          // console.log(resp);

          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/home/corredor/${resp.medico._id}`);
        });
        console.log(this.medicoForm.value);

    }
  }

 
}
