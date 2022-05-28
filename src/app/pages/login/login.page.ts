import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  contrasena: string;
  user : [];

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: ToastController
    ) { }

  ngOnInit() {
  }

  login() {
    const params = {
      usuario: this.usuario,
      contrasena: this.contrasena
    };

    let navigationExtras: NavigationExtras = { // Creacion de un contexto para pasar a otro sitio 
      state:{
        usuario: this.usuario
      }
    };

    this.api.login(params).subscribe(msg => {
      msg.logueado ? this.router.navigate(['tabs/home'],navigationExtras) : this.toastMsj(msg.mensaje);
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

  


}
