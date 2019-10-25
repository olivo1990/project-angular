import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service.service';
import { VERSION, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AlertDialogComponent } from '../../dialog//alert-dialog/alert-dialog.component';
import { ErrorStateMatcher } from '@angular/material/core';

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
  hide:boolean = true;
  hideV:boolean = true;
  verificarPasswordValue:string;
  errores: string[];
  version = VERSION;
  validarError:boolean = false;
  validarPassword:boolean = false;
  mensajeErrorPassword:string;

  constructor(private _snackBar: MatSnackBar,private router: Router,
    private activatedRoute: ActivatedRoute,private usuarioService:UsuarioService, private dialog: MatDialog) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nombreFormControl = new FormControl('', [
    Validators.required
  ]);

  apellidoFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  verificarPasswordFormControl = new FormControl('', [
    Validators.required,
  ]); 

  matcher = new MyErrorStateMatcher();

  registrar():void{

    if(this.verificarPasswordValue !== this.usuario.password){
      console.log("ingresó");
      /*let message = "Los passwords no coinciden";
      this.openSnackBar(message);*/
      this.validarPassword = true;
      this.mensajeErrorPassword = "Los passwords no coinciden";
      return;
    }

    if(this.nombreFormControl.hasError('required') || this.apellidoFormControl.hasError('required') || this.passwordFormControl.hasError('required') || this.verificarPasswordFormControl.hasError('required') || this.emailFormControl.hasError('required')){
      return;
    }

    this.usuarioService.registrar(this.usuario)
      .subscribe(
        usuario => {
          this.usuario = usuario;
          this.router.navigate(['/login/0']);
          //this.router.navigate(['/clientes']);
          //swal('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          this.router.navigate(['/login/0']);
          let titulo = "Error del servidor";
          let mensaje = this.errores;
          this.openAlertDialog(titulo, mensaje);

          //console.error(err.error.errors);
        }
    );

  } 

  openAlertDialog(titulo, mensaje) {
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      width: '300px',
      data:{
        title: titulo,
        message: mensaje,
        buttonText: {
          cancel: 'Cerrar'
        }
      },
    });
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 5 * 1000,
      panelClass: ['warning-snackbar']
    });
  }

}
