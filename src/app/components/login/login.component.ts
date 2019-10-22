import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  titulo:string = "Login";
  usuario:Usuario;
  validarUsuario:boolean = false;
  mensajeErrorUser:string;
  validarPassword:boolean = false;
  mensajeErrorPass:string;
  hide:boolean = true;
 
  isLeftVisible:boolean;

  constructor(private router:Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {}

  login():void{

    console.log(this.usuario);
    this.validarUsuario = false;
    this.validarPassword = false;

    if(this.usuario.username === "" || this.usuario.username === undefined){
      this.validarUsuario = true;
      this.mensajeErrorUser = "El username es obligatorio";
    }

    if(this.usuario.password === "" || this.usuario.password === undefined){
      this.validarPassword = true;
      this.mensajeErrorPass = "El password es obligatorio";
    }

  }

}
