import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string;
  contrasena: string;
  user: [];

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
      contrasena: Md5.hashStr(this.contrasena)
    };
    //console.log(params);

    this.api.login(params).subscribe(msg => {
      
      if (msg.logueado) {
        this.router.navigate(['tabs/home']);
        
        const p = { var_user: params.usuario };
        
        let objetoUsuario;
        
        this.api.getPerfilusuario(p).subscribe(res => {
          console.log(res);
          objetoUsuario = JSON.stringify(res.usuarios[0]);
          console.log(objetoUsuario);
          Storage.set({ key: 'logueado', value: objetoUsuario });
        });
      } else { this.toastMsj(msg.mensaje); }
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
