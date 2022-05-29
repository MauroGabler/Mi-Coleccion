import { ApiService } from 'src/app/servicios/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { RutValidator, RutDirective } from 'ng9-rut';
import { ToastController } from '@ionic/angular';
import { validarContrasenas } from 'src/app/validadores/validadores';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  viewProviders: [RutDirective]
})
export class RegisterPage implements OnInit {

  @ViewChild(IonSegment, { static: true })
  segment: IonSegment;

  contrasena1: string;
  contrasena2: string;
  boolContrato = false;
  boolNombreOcupado: boolean;

  formulario: FormGroup;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private rv: RutValidator,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nombres: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      rut: ['', [Validators.required, this.rv]],
      alias: ['', [Validators.required]],
      contrasena1: ['', [Validators.required]],
      contrasena2: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      boolContrato: [false, [Validators.required, Validators.requiredTrue]]
    }, { validator: validarContrasenas });

  }

  registrar() {

    const nombre = { var_user: this.formulario.value.alias };

    this.api.consultarNombreUsuario(nombre).subscribe(msg => {

      if (msg) {
        this.toastMsj('El nombre de usuario ingresado ya existe. Prueba con otro!');
        return;
      } else {

        const params: object = {

          var_prim_nombre: this.formulario.value.nombres,
          var_ape_paterno: this.formulario.value.apPaterno,
          var_ape_materno: this.formulario.value.apMaterno,
          nro_rut_usu: this.formulario.value.rut,
          var_user: this.formulario.value.alias,
          var_pass: Md5.hashStr(this.formulario.value.contrasena1),
          var_mail_usu: this.formulario.value.correo,
        };

        this.api.registrarUsuario(params).subscribe(res => {

          this.toastMsj(res.mensaje);
          if (res.mensaje === 'Se ha guardado un nuevo usuario') {
            console.log('redirigiendo...');

            location.reload();
            // this.segment.value = 'login';
            // this.router.navigate('/menu-auth');
          }
        });
      }
    });
  }

  async toastMsj(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      position: 'bottom',
      duration: 3000,
    });
    toast.present();
  }

};


