import { Component,NgZone,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formsumitted = false;
  public auth2:any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone:NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
        .subscribe((resp:any)=>{

          if(this.loginForm.get('remember')?.value){


            localStorage.setItem('email',this.loginForm.get('email')?.value);
          }else{

            localStorage.removeItem('email');

          }
          // Mover al dashboard
          this.router.navigateByUrl('/home');
        },(err)=>{

          Swal.fire('Error',err.error.msg,'error');
        })
  }
  
  // var id_token = googleUser.getAuthResponse().id_token;
 

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      
    });

    this.startApp();
  }

   async startApp () {
   
      await this.usuarioService.googleInit();
      this.auth2=this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
    
  };

   attachSignin(element:any) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(
            resp =>{
               
               // Navegar al dashboard

               this.ngZone.run(()=>{


                this.router.navigateByUrl('/home')
               })
              
              })
          
         
          
          

        }, (error:any)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }



}
