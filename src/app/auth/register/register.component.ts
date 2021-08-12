import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formsumitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Catriel', [Validators.required]],
      email: [
        'catrielcaruso@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [true, [Validators.required]],
    },
    {
      validators: this.passwordIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
    private router:Router
  ) {}

  crearUsuario() {
    this.formsumitted = true;
    console.log(this.registerForm.value);
    // console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioServices.crearUsuario(this.registerForm.value)
        .subscribe((resp:any)=>{
          console.log('Usuario creado');
          console.log(resp);
          this.router.navigateByUrl('/home');
        },(err:any)=>{
          
          // Si sucede un error
          Swal.fire('Error',err.error.msg,'error');

        });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formsumitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formsumitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formsumitted;
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return (formGorup: FormGroup) => {
      const pass1Control = formGorup.get(pass1Name);
      const pass2Control = formGorup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({
          noEsIgual: true,
        });
      }
    };
  }
}
