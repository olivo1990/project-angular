import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UrlConfig } from '../config/url-config';


@Injectable()
export class UsuarioService {

  private usuario:Usuario;

  urlObjeto:UrlConfig;

  constructor(private http: HttpClient, private router: Router) { 
    this.urlObjeto = new UrlConfig();
  }


  /*registrar(usuario: Usuario): Usuario {

    this.usuario = usuario;
    
    return this.usuario;
  }*/

  registrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post(this.urlObjeto.urlServices(), usuario, { })
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError(e => {

          if (e.status == 400) {
            return throwError(e);
          }

          //console.error(e.error.mensaje);
          //swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
   }

}
