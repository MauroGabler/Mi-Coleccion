import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ToastController } from '@ionic/angular';// Libreria mensaje Toas
import { ApiService } from '../../servicios/api.service'; // Import de API
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string;
  usuario: any = {};
  publicaciones:any={};

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const data = this.router.getCurrentNavigation().extras.state.usuario;

        this.nombreUsuario = data;
        const getUser = {
          var_user: this.nombreUsuario
        };
      }
      });

  }
  

  
  ngOnInit() 
  {

    const getUser = {
      var_user: this.nombreUsuario
    };

    this.api.getPerfilusuario(getUser).subscribe(resultado => {
      this.usuario = resultado.usuarios[0];
      const miUsuario = JSON.stringify(this.usuario);
      Storage.set({key: 'miUsuario', value: miUsuario});
    });

    console.log("usuario >> post ")
    console.log(this.nombreUsuario)

    this.api.consultarPublicaciones().subscribe(resultado=> {
      this.publicaciones =  resultado;
      console.log("publicaciones rescatadas")
      console.log(this.publicaciones)
      });
  

}


  irAPost(idPost){
    let navigationExtras: NavigationExtras = { 
      state:{
        iduser: this.nombreUsuario,
        idPost: idPost
      }
    };
    this.router.navigate(['tabs/view-post/'+ idPost], navigationExtras)
  }


  cerrarSesion() {
    Storage.clear();
    this.router.navigate(['/menu-auth']);
  }

  async obtenerUsuario() {
    const storage = await Storage.get({ key: 'logueado' });
    const valores = JSON.parse(storage.value);
    this.nombreUsuario = valores.VAR_USER;
  }
}
