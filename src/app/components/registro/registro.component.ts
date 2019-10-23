import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  titulo:string = "Crear cuenta";
  usuario:Usuario;
  validarNombre:boolean = false;
  validarApellido:boolean = false;
  validarCorreo:boolean = false;
  mensajeErrorNombre:string;
  mensajeErrorApellido:string;
  mensajeErrorCorreo:string;

  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  registrar():void{
    if(this.usuario.nombre === "" || this.usuario.nombre === undefined){
      this.validarNombre = true;
      this.mensajeErrorNombre = "El nombre es obligatorio";
    }

    if(this.usuario.apellido === "" || this.usuario.apellido === undefined){
      this.validarApellido = true;
      this.mensajeErrorApellido= "El nombre es obligatorio";
    }

    if(this.usuario.correo === "" || this.usuario.correo === undefined){
      this.validarCorreo = true;
      this.mensajeErrorCorreo= "El nombre es obligatorio";
    }
  }  

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

}
