import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { validarContrasenas, validarNombreUsuario } from 'src/app/validadores/validadores';

import { IUsuario } from './usuario';
//import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RutValidator } from 'ng9-rut';

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

  u: IUsuario;

  constructor(
    private toast: ToastController,
    private api: ApiService,
    private router: Router,
    private rv: RutValidator,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nombres: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      rut: ['', [Validators.required, this.rv]],
      alias: ['', [Validators.required, validarNombreUsuario]],
      contrasena1: ['', [Validators.required]],
      contrasena2: ['', [Validators.required]],
      // contrasenas: this.fb.group({
      //   contrasena1: ['', [Validators.required]],
      //   contrasena2: ['', [Validators.required]],
      // }, { validator: this.matchingPasswords }),
      correo: ['', [Validators.required, Validators.email]],
      boolContrato: [false, [Validators.required, Validators.requiredTrue]]
    }, { validator: validarContrasenas });
  }


  registrar() {

    // let boolPuede = false;

    // if (this.contrasena1 === this.contrasena2) {

    const params: object = {

      var_prim_nombre: this.formulario.value('nombres'),
      // var_prim_nombre: this.formulario.nombres,
      var_ape_paterno: this.formulario.value('apPaterno'),
      var_ape_materno: this.formulario.value('apMaterno'),
      nro_rut_usu: this.formulario.value('rut'),
      var_user: this.formulario.value('alias'),
      var_pass: this.formulario.value('contrasena1'),
      var_mail_usu: this.formulario.value('correo'),
    };

    console.log(params);

    this.api.registrarUsuario(params).subscribe(res => {
      console.log(res.mensaje);
      this.toastMsj(res.mensaje);

      if (res.mensaje === 'Se ha guardado un nuevo usuario') {
        this.router.navigate(['']);
      }

    });

    // } else {
    //   this.toastMsj('Las contraseñas ingresadas no coinciden');
    // }
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
    console.log(this.formulario);
  }

  // async validarNombreUsuario(nombre: AbstractControl) {
  //   const user: object = {
  //     var_user: nombre.get('nombres')
  //   };

  //   const res = await this.api.consultarNombreUsuario(user).subscribe();

  //   return res ? null : { yaExiste: true };
  // }

}
