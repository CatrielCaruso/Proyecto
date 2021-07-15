import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form-interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario?: Usuario;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role():any{
   
    return this.usuario?.role;

  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      console.log('google init');

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '300627287121-k6jfflsoktmic44qkpphfogikl00h16r.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  guardarLocalStorage(token:string,menu:any){

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    //  this.auth2.singOut().then( () =>{

    //   this.router.navigateByUrl('/login')
    //  }

    //  )

    // TODO:Borrar menú

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, img = '', nombre, role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
          // this.usuario.imprimirUsuario();
          this.guardarLocalStorage(resp.token,resp.menu);
          return true;
        }),

        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role?: string }) {

    data={
      
      ...data,
      role:this.usuario?.role

    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers
     
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }

  loginGoogle(token: any) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    // http://localhost:3000/api/usuarios?=0

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
               .pipe(
               
                map(resp=>{
                  
                  const usuarios= resp.usuarios.map(
                    user=> new Usuario(user.nombre,user.email,'',user.google,user.img,user.role,user.uid));
                  return {

                   total:resp.total,
                   usuarios

                  };

                }),

               );
  }

  eliminarUsuario(usuario:Usuario){

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);

  }

  guardarUsuario(usuario:Usuario) {
    
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers
     
    );
  }



}
