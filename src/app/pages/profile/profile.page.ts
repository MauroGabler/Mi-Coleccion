import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';// Libreria mensaje Toas
import {NavigationExtras, Router, ActivatedRoute} from '@angular/router';  // IMPORTAR LIBRERIA DE RUTAS
import { ApiService } from '../../servicios/api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario:any={}
  nombreUsuario: string;
  vacio= ""
  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  publicaciones:any[];
  cantPublicaciones = 0;

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params=>{

      if(this.router.getCurrentNavigation().extras.state)
        {
          let data = this.router.getCurrentNavigation().extras.state.usuario;

          const getUser = {
            var_user: data
          }


          this.api.getPerfilusuario(getUser).subscribe(resUsu =>
            {
              this.usuario = resUsu.usuarios[0]
              this.nombreUsuario = this.usuario.VAR_USER

              const params = {
              USUARIO_INT_ID_USU: this.usuario.INT_ID_USU
              }

              this.api.getMisPublicaciones(params).subscribe((resPubli)=>
              {
                this.publicaciones = resPubli.publicaciones;
                this.cantPublicaciones = resPubli.publicaciones.length;
                //console.log("publicaciones: ")
                //console.log(this.publicaciones)
                //console.log(this.cantPublicaciones)
                return this.publicaciones
              })
            })  
        } //Fin if
      }); //Fin ActivateRoute
  } // fin NgOninit




  irAPost(idPost){
    let navigationExtras: NavigationExtras = { 
      state:{
        iduser: this.nombreUsuario,
        idPost: idPost
      }
    };
    this.router.navigate(['tabs/view-post/'+ idPost], navigationExtras)
  }


} // fin
