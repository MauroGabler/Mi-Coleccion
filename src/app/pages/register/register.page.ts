import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { IUsuario } from './usuario';
import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RutValidator } from 'ng2-rut';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  contrasena1: string;
  contrasena2: string;
  boolContrato = false;
  usuario = {
    nombres: '',
    apPaterno: '',
    apMaterno: '',
    rut: '',
    alias: '',
    contrasena: '',
    correo: ''
  };
  formulario: FormGroup;
  // let usuario: Array<IUsuario> = usuario;

  u: IUsuario;

  constructor(
    private toast: ToastController,
    private api: ApiService,
    private router: Router,
  ) {

  //   this.formulario = fb.group({
  //     nombres: ['', [Validators.required]],
  //     apPaterno: ['', [Validators.required]],
  //     apMaterno: ['', [Validators.required]],
  //     rut: ['', [Validators.required, this.rv]],
  //     alias: ['', [Validators.required]],
  //     contrasena: ['', [Validators.required]],
  //     correo: ['', [Validators.required]],
  //     boolContrato: [this.boolContrato === true]
  //   });
  }

  ngOnInit() {
  }


  registrar() {

    // let boolPuede = false;

    if (this.contrasena1 === this.contrasena2) {

      const params: object = {

        var_prim_nombre: this.usuario.nombres,
        var_ape_paterno: this.usuario.apPaterno,
        var_ape_materno: this.usuario.apMaterno,
        nro_rut_usu: this.usuario.rut,
        var_user: this.usuario.alias,
        var_pass: this.contrasena1,
        var_mail_usu: this.usuario.correo,
      };

      this.api.registrarUsuario(params).subscribe(res => console.log(res));
    } else {
      this.toastMsj('Las contraseñas ingresadas no coinciden');
    }
  }

  async toastMsj(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }

  onSubmit() {

  }

}
