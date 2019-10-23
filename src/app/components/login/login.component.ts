import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  titulo:string = "Iniciar sesión";
  usuario:Usuario;
  validarUsuario:boolean = false;
  mensajeErrorUser:string;
  validarPassword:boolean = false;
  mensajeErrorPass:string;
  hide:boolean = true;
  crearCuenta:boolean = false;
  ocultarOverlay:boolean = false;

  constructor(private router:Router, private route:ActivatedRoute,) { 
    this.usuario = new Usuario();
    //setTimeout(function(){ this.ocultarOverlay = true; }, 3000);

    setTimeout(()=>{
      this.ocultarOverlay = true;
    }, 2000);
  }

  ngOnInit() {
    this.route.params.subscribe( params =>{
      if(params["over"] == 0){
        this.ocultarOverlay = true;
      }
    });
  }

  login():void{

    if(this.usuario.correo === "" || this.usuario.correo === undefined){
      this.validarUsuario = true;
      this.mensajeErrorUser = "El username es obligatorio";
    }

    if(this.usuario.password === "" || this.usuario.password === undefined){
      this.validarPassword = true;
      this.mensajeErrorPass = "El password es obligatorio";
    }

  }

}
